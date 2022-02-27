import { useRef } from "react";
import { useDrag } from "react-dnd";

export default function ({ children, id, type, onEndDrag }: any) {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    // 用于描述拖动源的普调JS对象s
    item: () => ({ id, type }),
    // 收集功能，用来收集属性，返回一个JS对象，并且返回值会合并到你的组件属性中
    // monitor 里面存放的是一些拖动的状态，当拖动状态发生变化时通知组件重新获取属性并刷新组件
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (draggedItem, monitor) => {
      const dropResult = monitor.getDropResult() as any;
      //console.log("sourceItem endDrag", draggedItem.type, dropResult);
      // 确定组件已经放置到右侧区域，有结果返回的时候，调用新增组件的方法
      if (monitor.didDrop() && dropResult) {
        onEndDrag(dropResult.id, draggedItem.type);
      }
    },
  });

  drag(ref);

  return (
    <div ref={ref} style={{ width: "100%", height: "36px", background: "red" }}>
      {children}
    </div>
  );
}
