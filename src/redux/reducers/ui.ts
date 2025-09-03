import { UIReduxState } from "@model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UIReduxState = {
  window_width: 0,
  window_height: 0,
};

export const uiSlice = createSlice({
  name: "@ui",
  initialState,
  reducers: {
    setWindowWidth: (state: UIReduxState, { payload }: { payload: number }) => {
      state.window_width = payload;
    },
    setWindowHeight: (
      state: UIReduxState,
      { payload }: { payload: number }
    ) => {
      state.window_height = payload;
    },
  },
});

export const { actions: uiActions, reducer: uiReducer } = uiSlice;
