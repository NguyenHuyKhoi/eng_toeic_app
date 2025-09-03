import { IVideo } from "../video";

export interface DictationReduxState {
  doing: boolean;
  video?: IVideo;
  sentence_idx: number;
  complete_sentence_idxs: number[];
  complete_sentences: string[];
  focus_word?: string;
}
