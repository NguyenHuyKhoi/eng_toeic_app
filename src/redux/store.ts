// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  commonReducer,
  dictationReducer,
  uiReducer,
  videoPlayReducer,
} from "./reducers";
const reducers = combineReducers({
  common: commonReducer,
  ui: uiReducer,
  dictation: dictationReducer,
  video_play: videoPlayReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof reducers>;
