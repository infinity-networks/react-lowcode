import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { traverse } from "../utils";

export interface ComNodeSchema {
  id: string;
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
  props: {
    style: {
      width: '400px',
      height: '800px',
      border: '1px solid gray',
      backgroundColor: 'red'
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
