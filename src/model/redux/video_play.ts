import { IVideo } from "../video";

export interface VideoPlayReduxState {
  video?: IVideo;
  focus_sentence_index: number;
  seek_time?: number;
  end_time?: number;
  playing: boolean;
  transcript_show: boolean;
}
