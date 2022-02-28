import { Button, Card, Modal } from "@arco-design/web-react";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
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
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>添加组件库</Button>
      <Modal
        title="所有组件库"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <p>
          You can customize modal body text by the current situation. This modal
          will be closed immediately once you press the OK button.
        </p>
      </Modal>
      {/* <div
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
      </div> */}
      <Card style={{ width: "100%" }}>
        {comlib.map((item, index) => (
          <SourceItem
            key={item.id}
            id={item.id}
            type={item.type}
            onEndDrag={onEndDrag}
          >
            <Card title={item.name}></Card>
          </SourceItem>
        ))}
      </Card>
    </div>
  );
}
