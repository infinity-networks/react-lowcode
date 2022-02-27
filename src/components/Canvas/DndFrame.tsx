import { useContext, useEffect } from "react";
import { DndContext } from "react-dnd";
import { FrameContext } from "react-frame-component";

export default function DndFrame({ children }: any) {
  const { dragDropManager } = useContext(DndContext);
  const { window } = useContext(FrameContext);

  useEffect(() => {
    (dragDropManager?.getBackend() as any).addEventListeners(window);
  });

  return children;
}
