import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { isParentNode, traverse } from "../utils";

export interface ComNodeSchema {
  id: string;
  title: string;
  type: string | any;
  props: Record<string, any>;
  children: ComNodeSchema[];
}

export interface CodeTreeState extends ComNodeSchema {
  foucsId?: string;
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
      backgroundColor: 'white'
    }
  },
  children: []
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
      const { dragItem, overItem } = action.payload;
      console.log('move', dragItem, overItem)

      const { dragId, dragType, dragParentId } = dragItem;
      const { overId, overType, overParentId } = overItem;

      let item: any;

      console.log('tree',)

      traverse(state, (sub) => {
        if (sub.id === dragParentId) {
          const dragIndex = sub.children.findIndex((item) => item.id === dragId);
          item = sub.children.splice(dragIndex, 1)[0];
          return false;
        }
        return true;
      });

      traverse(state, (sub) => {
        if (!isParentNode(overType) && sub.id === overParentId) {
          const overIndex = sub.children.findIndex(item => item.id === overId);
          sub.children.splice(overIndex, 0, item);
          return false;
        }
        //非嵌套标签往父层插入

        if (isParentNode(overType) && sub.id === overId) {
          if (sub.children) {
            sub.children.unshift(item)
          } else {
            sub.children = [item]
          }
          return false;
        }
        return true;
      })
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
