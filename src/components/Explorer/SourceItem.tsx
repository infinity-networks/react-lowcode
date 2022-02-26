import { DragSource } from 'react-dnd';

const source = {
  // 开始拖拽前组织数据结构
  beginDrag(props: any, monitor: any, component: any) {
    return {
      type: props.type,
    };
  },
  endDrag(props: any, monitor: any) {
    const item = monitor.getItem();
    const result = monitor.getDropResult();
    console.log('onEndDrag', result.id, item.type);
    // 确定组件已经放置到右侧区域，有结果返回的时候，调用新增组件的方法
    if (monitor.didDrop() && result) {
      props.onEndDrag(result.id, item.type);
    }
  },
};

const collect = (connect: any, monitor: any) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

function SourceBox(props: any) {
  const { connectDragSource, isDragging, children, id } = props;
  const classes = isDragging ? 'active' : '';
  return connectDragSource(
    <div style={{ width: '100%', height: '36px', background: 'red' }}>
      {children}
    </div>,
    {
      dropEffect: 'copy',
    },
  );
}

export default DragSource('ITEM', source, collect)(SourceBox);
