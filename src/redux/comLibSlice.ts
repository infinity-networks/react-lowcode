import { createSlice } from "@reduxjs/toolkit";

export interface ComInfoSchema {
  name: string;
  editor: string;
  runtime: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
}

export interface ComGroupSchema {
  name: string;
  components: [
    {
      namespace: string;
      url: string;
      info: ComInfoSchema;
    }
  ]
}

export interface ComLibSchema {
  name: string;
  uid: string;
  version: string;
  groups: ComGroupSchema[];
}

const initialState: ComLibSchema[] = [

]

const comlib = createSlice({
  name: 'comlib',
  initialState,
  reducers: {

  }
})
