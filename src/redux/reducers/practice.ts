import { IExam, PracticeReduxState } from "@model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PracticeReduxState = {
  part_index: 1,
  question_index: 1,
  year: 2024,
  showed_answers: [],
  user_answers: [],
};

export const practiceSlice = createSlice({
  name: "@practice",
  initialState,
  reducers: {
    selectExam: (
      state: PracticeReduxState,
      { payload }: { payload: IExam }
    ) => {
      state.exam = payload;
      state.user_answers = new Array(201).fill(null);
      state.showed_answers = [];
    },
    selectPart: (
      state: PracticeReduxState,
      { payload }: { payload: number }
    ) => {
      state.part_index = payload;
    },
    showCorrectAnswer: (
      state: PracticeReduxState,
      { payload }: { payload: number[] }
    ) => {
      console.log("Show corrects: ", payload);
      state.showed_answers.push(...payload);
    },
    hideCorrectAnswer: (
      state: PracticeReduxState,
      { payload }: { payload: number[] }
    ) => {
      console.log("Hide corrects: ", payload);
      state.showed_answers = state.showed_answers.filter(
        (u) => !payload.includes(u)
      );
    },
    selectAnswer: (
      state: PracticeReduxState,
      { payload }: { payload: { question_index: number; answer: number } }
    ) => {
      console.log("Select answer:", payload);
      const old_answer = state.user_answers[payload.question_index];
      const new_answer = old_answer === payload.answer ? null : payload.answer;
      state.user_answers[payload.question_index] = new_answer;
    },
    selectYear: (
      state: PracticeReduxState,
      { payload }: { payload: number }
    ) => {
      state.year = payload;
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
