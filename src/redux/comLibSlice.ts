import { createSlice } from "@reduxjs/toolkit";

export interface ComRefSchema {
  name: string;
  url: string;
}

export interface ComGroupSchema {
  name: string;
  components: ComRefSchema[];
}

export interface ComLibSchema {
  name: string;
  uid: string;
  version: string;
  components: ComGroupSchema[];
}

const initialState: ComLibSchema[] = [

]

const comlib = createSlice({
  name: 'comlib',
  initialState,
  reducers: {

  }
})
