import { IVideo, SentenceEntity, VideoPlayReduxState } from "@model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: VideoPlayReduxState = {
  focus_sentence_index: 0,
  playing: false,
  transcript_show: false,
};

export const videoPlaySlice = createSlice({
  name: "@dictation",
  initialState,
  reducers: {
    setVideo: (
      state: VideoPlayReduxState,
      { payload }: { payload: IVideo }
    ) => {
      state.video = payload;
    },
    setSentenceIndex: (
      state: VideoPlayReduxState,
      { payload }: { payload: number }
    ) => {
      state.focus_sentence_index = payload;
    },
    playSentence: (
      state: VideoPlayReduxState,
      { payload }: { payload: { sentence: SentenceEntity; index: number } }
    ) => {
      console.log("Triggier play sentence: ", payload);
      state.playing = true;
      state.focus_sentence_index = payload.index;
      state.seek_time = payload.sentence.start + 0.05;
      state.end_time = undefined;
    },
    seekTime: (
      state: VideoPlayReduxState,
      { payload }: { payload: number }
    ) => {
      state.seek_time = payload;
    },
    setEndTime: (
      state: VideoPlayReduxState,
      { payload }: { payload: number }
    ) => {
      state.end_time = payload;
    },
    setPlaying: (
      state: VideoPlayReduxState,
      { payload }: { payload: boolean }
    ) => {
      state.playing = payload;
    },
  },
});

export const { actions: videoPlayActions, reducer: videoPlayReducer } =
  videoPlaySlice;
