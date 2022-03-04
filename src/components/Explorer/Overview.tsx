import { Button, Card, Modal } from "@arco-design/web-react";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import SourceItem from "./SourceItem";

export default function ({ comLib, onEndDrag }: any) {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      {comLib.map((item: any, index: number) => (
        <SourceItem key={item.name} item={item} onEndDrag={onEndDrag}>
          {item.name}
        </SourceItem>
      ))}
    </div>
  );
}
