import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget, DragSource } from 'react-dnd';

const source = {
  /**
   * 拖拽前为组件增加一些属性
   * @param {*} props
   */
  beginDrag(props: any) {
    const { parentId, item, children } = props;
    const { id, type } = item;
    console.log('beginDrag', props);
    return {
      id,
      parentId,
      type,
      children,
    };
  },
  /**
   * 限制组件是否可拖拽
   * @param {*} props
   */
  canDrag(props: any) {
    if (props.parentId === null) return false;
    return true;
  },
  /**
   * 当前组件是否处于拖拽中
   * @param {*} props
   * @param {*} monitor
   */
  isDragging(props: any, monitor: any) {
    return props.item.id === monitor.getItem().id;
  },
  /**
   * 我们认为当一个组件停止拖拽时移动中的位置都是在查找合适的的位置，只有在停止的时候才是它真正想要放置的位置
   * @param {*} props
   * @param {*} monitor
   */
  endDrag(props: any, monitor: any) {
    const result = monitor.getDropResult();
    // console.log("endDrag", props, result);
    if (result.dragItem) {
      const { dragItem, overItem } = result;
      props.move(dragItem, overItem);
    }
  },
};

function sourceCollect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

const target = {
  /**
   * 是否可以将拖拽的元素放置
   * @param {*} props
   * @param {*} monitor
   */
  canDrop(props: any, monitor: any) {
    // console.log("canDrop", props, monitor);
    // 在此处可以获取到拖拽的组件类型，从而增加一些是否可以放置的条件
    // const dragType = monitor.getItem().type;
    // // 放置的组件类型
    // const dropType = props.item.type;
    return true;
  },

  /**
   *
   * @param props
   * @param monitor
   * @param compoent
   */
  hover(props: any, monitor: any, compoent: any) {
    // if (!props || !monitor.getItem()) return;
    // const dragItem = {
    //   dragId: monitor.getItem().id,
    //   dragParentId: monitor.getItem().parentId,
    // };
    // const hoverItem = { hoverId: props.id, hoverParentId: props.parentId };
    // const dragRef = document.getElementById(dragItem.dragId);
    // const hoverRef = document.getElementById(hoverItem.hoverId);
    // console.log('hover', props, monitor, compoent);
  },

  /**
   * 使用drop而未使用hover是不想一直更改数据结构
   * @param {*} props
   * @param {*} monitor
   */
  drop(props: any, monitor: any) {
    const didDrop = monitor.didDrop();

    if (didDrop) {
      return undefined;
    }

    const { id: draggedId, parentId: dragParentId } = monitor.getItem();
    const { parentId: overParentId } = props;
    const { id: overId } = props.item;

    // console.log(
    //   "drop",
    //   props.move,
    //   { draggedId, dragParentId },
    //   { overId, overParentId }
    // );

    if (draggedId) {
      if (
        draggedId === overId ||
        draggedId === overParentId ||
        dragParentId === overId ||
        overParentId === undefined
      )
        return undefined;
      const dragItem = { draggedId, dragParentId };
      const overItem = { overId, overParentId };
      props.move(dragItem, overItem);
      return {
        dragItem,
        overItem,
      };
    }
    return { id: overId };
  },
};

function targetCollect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  };
}

const ComponentWrapper = (props: any) => {
  const {
    connectDropTarget,
    connectDragSource,
    canDrop,
    isOver,
    item,
    move,
    children,
    parentId,
  } = props;

  const classes =
    canDrop || isOver ? 'border-dashed border-2 border-sky-500' : '';

  return React.createElement(item.type, {
    ...item.props,
    key: item.id,
    id: item.id,
    type: item.type,
    className: `${classes}`,
    ref: (instance: any) => {
      const node = findDOMNode(instance);
      connectDragSource(node);
      connectDropTarget(node);
    },
    children,
  });
};

export default DropTarget(
  'ITEM',
  target,
  targetCollect,
)(DragSource('ITEM', source, sourceCollect)(ComponentWrapper));
