import { Button, Input, Modal } from "@arco-design/web-react";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { RemoteComponent } from "../RemoteComponent";
import SourceItem from "./SourceItem";

const comlib = [
  {
    id: nanoid(10),
    type: "div",
    name: "容器",
  },
  {
    id: nanoid(10),
    type: "p",
    name: "文本",
  },
  {
    id: nanoid(10),
    type: "button",
    name: "按钮",
  },
];

const loadManifest = async (url: string) => {
  return axios.get(`http://${url}/manifest.json`).then((res) => res.data);
};

export default function ({ onEndDrag }: any) {
  const [comlibUrl, setComlibUrl] = useState("");
  const [comlib, setComlib] = useState<any[]>([]);
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
        <Input
          style={{ width: 350 }}
          addBefore="http://"
          allowClear
          placeholder="Please enter"
          defaultValue="127.0.0.1:8080"
          onPressEnter={async (e) => {
            const url = e.target.value || "127.0.0.1:8080";
            const manifest = await loadManifest(url);
            const comlib = Object.keys(manifest.components).map((key) => {
              const component = manifest.components[key];
              console.log("url", `http://${url}/${key}/${component.runtime}`);
              console.log("com");
              return {
                id: nanoid(10),
                name: key,
                ...component,
                type: (
                  <RemoteComponent
                    url={`http://${url}/${key}/${component.runtime}`}
                  />
                ),
              };
            });
            setComlib(() => comlib);
            console.log("comlib", comlib);
          }}
        />
      </Modal>
      <div
        style={{
          display: "flex",
          minWidth: "200px",
          width: "100%",
        }}
      >
        {(comlib || []).map((item) => (
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
    </div>
  );
}
