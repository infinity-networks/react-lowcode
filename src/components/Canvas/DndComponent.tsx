import React, { useState } from "react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ComNodeSchema, setFocusId } from "../../redux/codeTreeSlice";

interface DndComponentProps {
  node: ComNodeSchema;
  move: any;
  focusedNode: any;
  focusId: string;
  parentId: string;
  children: any;
}

const focusStyle = {
  border: "1px dashed #FA6400",
};

export default function DndComponent({
  node,
  move,
  focusedNode,
  focusId,
  parentId,
  children,
}: DndComponentProps) {
  console.log("DndComponent", node, parentId);
  const ref = useRef<HTMLElement | null>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    // 用于描述拖动源的普调JS对象s
    item: () => ({ id: node.id, type: node.type, parentId }),
    // 收集功能，用来收集属性，返回一个JS对象，并且返回值会合并到你的组件属性中
    // monitor 里面存放的是一些拖动的状态，当拖动状态发生变化时通知组件重新获取属性并刷新组件
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const dropResult: any = monitor.getDropResult();
      console.log("dropResult", dropResult);
      if (dropResult.dragItem) {
        const { dragItem, overItem } = dropResult;
        move(dragItem, overItem);
      }
    },
    canDrag: () => {
      return node.id !== "root";
    },
  });

  const [{ isOver }, drop] = useDrop({
    // 一个字符串，这个放置目标只会对指定类型的拖动源发生反应
    accept: "ITEM",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    hover: (item: any, monitor) => {
      // 被拖动的卡片的索引
      const dragId = item.id,
        parentId = item.parentId;
      const dropId = node.id,
        dropParentId = parentId;
      if (dragId === dropId) return;
      const { top, bottom } = ref.current?.getBoundingClientRect() as any;
      const halfOfHoverHeight = (bottom - top) / 2;
      const { y } = monitor.getClientOffset() as any; // event.clientY
      const hoverClientY = y - top;

      if (hoverClientY > halfOfHoverHeight) {
      } else {
      }
    },
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      console.log("drop", item, monitor, didDrop);
      if (didDrop) {
        return undefined;
      }

      const {
        id: dragId,
        type: dragType,
        parentId: dragParentId,
      } = item as any;
      const { id: overId, type: overType } = node as any,
        overParentId = parentId;

      console.log(
        `dragId:${dragId}, dragParentId:${dragParentId}, overId:${overId}, overParentId:${overParentId}`
      );

      if (dragId) {
        if (
          dragId === overId ||
          dragId === overParentId ||
          dragParentId === overId ||
          overParentId === undefined
        ) {
          return undefined;
        } else if (dragParentId === undefined) {
          return { id: overId };
        }

        const dragItem = { dragId, dragType, dragParentId };
        const overItem = { overId, overType, overParentId };

        move(dragItem, overItem);

        return {
          dragItem,
          overItem,
        };
      }
      return { id: overId };
    },
    canDrop: (item, monitor) => {
      return true;
    },
  });

  drag(drop(ref));

  return React.createElement(node.type, {
    ...node.props,
    key: node.id,
    id: node.id,
    type: node.type,
    ref,
    children,
  });
}
