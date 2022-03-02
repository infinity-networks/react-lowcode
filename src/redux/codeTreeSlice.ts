import { createSlice, nanoid } from "@reduxjs/toolkit";
import React from "react";
import { isParentNode, traverse } from "../utils";
import { ComInfoSchema } from "./comLibSlice";

export interface ComNodeSchema {
  id: string;
  title: string;
  type: string | any;
  props: Record<string, any>;
  children: ComNodeSchema[];
}

export interface ComRefSchema {
  id: string;
  comInfo: ComInfoSchema;
}

export interface CodeTreeState extends ComNodeSchema {
  foucsId?: string;
  comref?: ComRefSchema[];
}

const initialState: CodeTreeState = {
  foucsId: '',
  id: 'root',
  type: 'div',
  title: '根节点',
  props: {
    style: {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
    },
    layout: 'flex-column'
  },
  children: [

  ],
  comref: []
}

const codeTree = createSlice({
  name: 'codeTree',
  initialState,
  reducers: {
    append: (state, action) => {
      const { hoverId, item } = action.payload;
      traverse(state, (sub) => {
        if (sub.id === hoverId) {
          sub.children.push(item)
          return false;
        }
        return true;
      })
    },
    move: (state, action) => {
      const { dragItem, overItem, hoverPosition } = action.payload;
      // console.log('move', dragItem, overItem)

      const { dragId, dragType, dragParentId } = dragItem;
      const { overId, overType, overParentId } = overItem;

      let item: any;

      traverse(state, (sub) => {
        if (sub.id === dragParentId) {
          const dragIndex = sub.children.findIndex((item) => item.id === dragId);
          item = sub.children.splice(dragIndex, 1)[0];
          return false;
        }
        return true;
      });

      if (!isParentNode(overType)) {
        traverse(state, (sub) => {
          if (sub.id === overParentId) {
            const dragIndex = sub.children.findIndex((item) => item.id === dragId);
            if (hoverPosition === 'left' || hoverPosition === 'top') {
              if (dragIndex === 0) {
                sub.children.unshift(item);
              } else {
                sub.children.splice(dragIndex - 1, 0,)
              }
            } else {
              if (dragIndex === sub.children.length - 1) {
                sub.children.push(item);
              } else {
                sub.children.splice(dragIndex + 1, 0,)
              }
            }
            return false;
          }
          return true;
        });
      } else {
        traverse(state, (sub) => {
          if (sub.id === overId) {
            sub.children.push(item);
          }
          return true;
        })
      }
    },
    update: (state, action) => {

    },
    remove: (state, action) => {

    },
    setFocusId: (state, action) => {
      const { foucsId } = action.payload;
      state.foucsId = foucsId;
    },
  }
});

export const { append, move, update, remove, setFocusId } = codeTree.actions;

export default codeTree.reducer;
