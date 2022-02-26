import React, { ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CodeTreeState, ComNodeSchema } from '../../redux/codeTreeSlice';
import ComponentWrapper from './ComponentWrapper';

interface CanvasProps {
  codeTree: CodeTreeState;
  move: () => void;
}

export default function ({ codeTree, move }: CanvasProps) {
  const renderTree = (node: ComNodeSchema, parentId: string): any => {
    return (
      <>
        <ComponentWrapper item={node} move={move} parentId={parentId}>
          {node.children.map((child) => renderTree(child, node.id))}
        </ComponentWrapper>
      </>
    );
  };

  return (
    <ComponentWrapper key={codeTree.id} item={codeTree} move={move}>
      {renderTree(codeTree, codeTree.id)}
    </ComponentWrapper>
  );
}
