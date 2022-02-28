import React, { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CodeTreeState, ComNodeSchema } from "../../redux/codeTreeSlice";
import Frame from "react-frame-component";
import DndFrame from "./DndFrame";
import "./index.less";
import DndComponent from "./DndComponent";

interface CanvasProps {
  codeTree: CodeTreeState;
  move: any;
  focusedNode: any;
}

export default function ({ codeTree, move, focusedNode }: CanvasProps) {
  const renderTree = (node: ComNodeSchema, parentId: string): any => {
    return (
      <>
        <DndComponent
          key={node.id}
          node={node}
          move={move}
          parentId={parentId}
          focusId={codeTree.foucsId as string}
          focusedNode={focusedNode}
        >
          {node.children && Array.isArray(node.children)
            ? node.children.map((child) => renderTree(child, node.id))
            : node.children}
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
        <body style="margin:0px;width:100%;height: 100%;">
        </body>
        </html>`}
        mountTarget="body"
        style={{ width: "100%", height: "100%", border: "0" }}
      >
        <DndFrame>{renderTree(codeTree, "")}</DndFrame>
      </Frame>
    </>
  );
}
