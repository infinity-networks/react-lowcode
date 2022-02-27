import { nanoid } from "@reduxjs/toolkit";
import { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import Explorer from "./components/Explorer";
import { append } from "./redux/codeTreeSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

import { DndContext, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DeviceFrameset } from "react-device-frameset";
import { SketchPicker } from "react-color";

function App() {
  const codeTreeState = useAppSelector((state) => state.codeTree);
  const dispatch = useAppDispatch();

  const onEndDrag = (hoverId: string, type: string) => {
    const item = {
      id: nanoid(10),
      parentId: hoverId,
      type,
      props: {},
      children: [],
    } as any;
    if (type === "div") {
      item.props.style = {
        width: "100%",
        height: "64px",
        backgroundColor: "blue",
      };
    } else {
      item.props.style = {
        width: "16px",
        height: "8px",
        backgroundColor: "black",
      };
    }
    dispatch(append({ hoverId, item }));
  };

  const moveNode = () => {};

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Explorer onEndDrag={onEndDrag} />
          <DeviceFrameset device="iPhone X" color="gold">
            <Canvas codeTree={codeTreeState} move={moveNode} />
          </DeviceFrameset>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
