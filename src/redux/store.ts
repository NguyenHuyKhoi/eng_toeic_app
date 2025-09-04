// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { practiceReducer } from "./reducers";
const reducers = combineReducers({
  practice: practiceReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof reducers>;
