import { CommonReduxState, IChannel, IPlaylist, IVideo } from "@model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CommonReduxState = {
  video_filter: {},
};

export const commonSlice = createSlice({
  name: "@common",
  initialState,
  reducers: {
    selectChannel: (
      state: CommonReduxState,
      { payload }: { payload: IChannel | undefined }
    ) => {
      if (state.focus_channel?.id !== payload?.id) {
        state.focus_playlist = undefined;
        state.focus_video = undefined;
      }
      state.focus_channel = payload;
    },
    selectPlaylist: (
      state: CommonReduxState,
      { payload }: { payload: IPlaylist | undefined }
    ) => {
      if (state.focus_playlist?.id !== payload?.id) {
        state.focus_video = undefined;
      }
      state.focus_playlist = payload;
    },
    selectVideo: (
      state: CommonReduxState,
      { payload }: { payload: IVideo | undefined }
    ) => {
      state.focus_video = payload;
    },
  },
});

export const { actions: commonActions, reducer: commonReducer } = commonSlice;
