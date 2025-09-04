import { IExam } from "../exam";
import { IVideoLevel } from "../video";

export interface CommonReduxState {
  exam?: IExam;
}

export interface IVideoFilter {
  level?: IVideoLevel;
}
