import { nanoid } from '@reduxjs/toolkit';
import { useContext, useEffect, useRef, useState } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import Explorer from './components/Explorer';
import { append } from './redux/codeTreeSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Frame, { FrameContext } from 'react-frame-component';
import { DndContext, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DeviceFrameset } from 'react-device-frameset';

const DndFrame = ({ children }: any) => {
  const { dragDropManager } = useContext(DndContext);
  const { window } = useContext(FrameContext);

  useEffect(() => {
    (dragDropManager?.getBackend() as any).addEventListeners(window);
  });

  return children;
};

function App() {
  const codeTreeState = useAppSelector((state) => state.codeTree);
  const dispatch = useAppDispatch();

  const onEndDrag = (hoverId: string, type: string) => {
    const item = {
      id: nanoid(10),
      type,
      props: {
        style: {
          width: '50px',
          height: '50px',
          background: 'black',
        },
      },
      children: [],
    };
    dispatch(append({ hoverId, item }));
  };

  const moveNode = () => {};

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Explorer onEndDrag={onEndDrag} />
          <DeviceFrameset device="iPhone 8" color="gold">
            <Frame style={{ width: '100%', height: '100%' }}>
              <DndFrame>
                <Canvas codeTree={codeTreeState} move={moveNode} />
              </DndFrame>
            </Frame>
          </DeviceFrameset>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
