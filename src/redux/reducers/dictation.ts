import { DictationReduxState, IVideo, REWRITE_SPLITER } from "@model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DictationReduxState = {
  complete_sentence_idxs: [],
  complete_sentences: [],
  sentence_idx: 0,
  doing: false,
};

export const dictationSlice = createSlice({
  name: "@dictation",
  initialState,
  reducers: {
    selectVideo: (
      state: DictationReduxState,
      { payload }: { payload: IVideo | undefined }
    ) => {
      if (state.video?.id !== payload.id) {
        state.complete_sentence_idxs = [];
        state.complete_sentences = [];
        state.sentence_idx = 0;
      }
      state.doing = true;
      state.video = payload;
    },
    focusWord: (
      state: DictationReduxState,
      { payload }: { payload: string | undefined }
    ) => {
      state.focus_word = payload;
    },
    restart: (state: DictationReduxState) => {
      state.doing = true;
      state.complete_sentence_idxs = [];
      state.complete_sentences = [];
      state.sentence_idx = 0;
    },
    pause: (state: DictationReduxState) => {
      state.doing = false;
    },
    resume: (state: DictationReduxState) => {
      state.doing = true;
    },
    setSentenceIdx: (
      state: DictationReduxState,
      { payload }: { payload: number }
    ) => {
      state.sentence_idx = payload;
    },
    completeSentence: (
      state: DictationReduxState,
      {
        payload,
      }: {
        payload: {
          idx: number;
          entered_words: string[];
        };
      }
    ) => {
      if (state.complete_sentence_idxs.includes(payload.idx)) {
        return;
      }
      state.complete_sentences[payload.idx] =
        payload.entered_words.join(REWRITE_SPLITER);
      state.complete_sentence_idxs.push(payload.idx);
    },
    uncompleteSentence: (
      state: DictationReduxState,
      {
        payload,
      }: {
        payload: number;
      }
    ) => {
      if (!state.complete_sentence_idxs.includes(payload)) {
        return;
      }
      state.complete_sentences[payload] = "";
      state.complete_sentence_idxs = state.complete_sentence_idxs.filter(
        (u) => u != payload
      );
    },
  },
});

export const { actions: dictationActions, reducer: dictationReducer } =
  dictationSlice;
