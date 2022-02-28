import { Tree } from "@arco-design/web-react";
import { ComNodeSchema } from "../../redux/codeTreeSlice";

interface OutlineProps {
  treeData: ComNodeSchema[];
}

export default function ({ treeData }: OutlineProps) {
  return (
    <div>
      大纲树
      <Tree
        draggable
        blockNode
        // onDrop={({ dragNode, dropNode, dropPosition }) => {

        // }}
        treeData={treeData}
        fieldNames={{
          key: "id",
          title: "title",
          children: "children",
        }}
      />
    </div>
  );
}
