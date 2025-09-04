import { PracticeReduxState } from "@model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PracticeReduxState = {
  part_index: 1,
  question_index: 1,
};

export const practiceSlice = createSlice({
  name: "@practice",
  initialState,
  reducers: {
    selectPart: (
      state: PracticeReduxState,
      { payload }: { payload: number }
    ) => {
      state.part_index = payload;
    },
    selectQuestion: (
      state: PracticeReduxState,
      { payload }: { payload: number }
    ) => {
      state.question_index = payload;
    },
  },
});

export const { actions: practiceActions, reducer: practiceReducer } =
  practiceSlice;
