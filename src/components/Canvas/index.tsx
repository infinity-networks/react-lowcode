import React, { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CodeTreeState, ComNodeSchema } from "../../redux/codeTreeSlice";
import ComponentWrapper from "./ComponentWrapper";
import Frame from "react-frame-component";
import DndFrame from "./DndFrame";
import "./index.less";
import DndComponent from "./DndComponent";

interface CanvasProps {
  codeTree: CodeTreeState;
  move: () => void;
}

export default function ({ codeTree, move }: CanvasProps) {
  const renderTree = (node: ComNodeSchema, parentId: string): any => {
    return (
      <>
        <DndComponent node={node} move={move} parentId={parentId}>
          {node.children.map((child) => renderTree(child, node.id))}
        </DndComponent>
      </>
    );
  };

  return (
    <>
      <Frame
        initialContent={`<!DOCTYPE html>
        <html style="width: 100%;height: 100%;">
        <head>
          <style>
            .frame-content {
              width:100%;
              height:100%
            }
          </style>
        </head>
        <body style="margin:0;width: 100%;height: 100%;">

        </body>
        </html>`}
        mountTarget="body"
        style={{ width: "100%", height: "100%" }}
      >
        <DndFrame>{renderTree(codeTree, "")}</DndFrame>
      </Frame>
    </>
  );
}
