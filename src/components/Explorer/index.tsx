import { Button, Empty, Input, Modal } from "@arco-design/web-react";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { ComManifestSchema } from "../../redux/codeTreeSlice";
import { useAppDispatch } from "../../redux/hooks";
import { RemoteComponent } from "../RemoteComponent";
import Overview from "./Overview";
import SourceItem from "./SourceItem";

const loadRemoteFile = async (url: string) => {
  return axios.get(`http://${url}/manifest.json`).then((res) => res.data);
};

interface ExplorerProps {
  comLibs: ComManifestSchema[];
  onEndDrag: Function;
  addComLib: Function;
}

export default function ({ onEndDrag, comLibs, addComLib }: ExplorerProps) {
  const dispatch = useAppDispatch();
  const [comlibUrl, setComlibUrl] = useState("");

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
            const manifest = await loadRemoteFile(url);
            const components = Object.keys(manifest.components).map((key) => {
              const component = manifest.components[key];
              return {
                comLibId: manifest.uid,
                name: key,
                ...component,
                entry: `http://${url}/${key}/${component.entry}`,
                editor: `http://${url}/${key}/${component.editor}`,
                runtime: `http://${url}/${key}/${component.runtime}`,
                type: `http://${url}/${key}/${component.runtime}`,
              };
            });
            manifest.components = components;
            addComLib(manifest.uid, manifest);
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
        {comLibs && comLibs.length > 0 ? (
          (comLibs || []).map((item) => (
            <Overview comLib={item.components} onEndDrag={onEndDrag} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}
