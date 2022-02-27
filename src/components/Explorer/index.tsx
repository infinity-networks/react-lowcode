import { nanoid } from "@reduxjs/toolkit";
import SourceItem from "./SourceItem";

const comlib = [
  {
    id: nanoid(10),
    type: "div",
    name: "容器",
  },
  {
    id: nanoid(10),
    type: "input",
    name: "输入框",
  },
  {
    id: nanoid(10),
    type: "button",
    name: "按钮",
  },
];

export default function ({ onEndDrag }: any) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
      }}
    >
      {comlib.map((item) => (
        <SourceItem
          key={item.id}
          id={item.id}
          type={item.type}
          onEndDrag={onEndDrag}
        >
          {item.name}
        </SourceItem>
      ))}
    </div>
  );
}
