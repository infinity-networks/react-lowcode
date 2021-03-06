import axios from "axios";
import { useRef } from "react";
import { useDrag } from "react-dnd";

export default function ({ children, item, onEndDrag }: any) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    // 用于描述拖动源的普调JS对象s
    item: () => ({
      id: item.name,
      entry: item.entry,
      type: item.type,
      comLibId: item.comLibId,
    }),
    // 收集功能，用来收集属性，返回一个JS对象，并且返回值会合并到你的组件属性中
    // monitor 里面存放的是一些拖动的状态，当拖动状态发生变化时通知组件重新获取属性并刷新组件
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: async (draggedItem, monitor) => {
      const dropResult = monitor.getDropResult() as any;
      // 确定组件已经放置到右侧区域，有结果返回的时候，调用新增组件的方法
      if (monitor.didDrop() && dropResult) {
        onEndDrag(dropResult.id, item);
      }
    },
  });

  drag(ref);

  return (
    <div
      ref={ref}
      style={{
        width: "64px",
        height: "64px",
        background: "#F7F8FA",
        borderRadius: "4px",
        border: "1px solid #E5E6EB",
        margin: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
}
