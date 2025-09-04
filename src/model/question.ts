import { EntityBase } from "./common";

export interface ISubQuestion {
  title: string;
  answers: string[];
  correct_answer: number;
}
export interface ISentence {
  start: number;
  end: number;
  text: string;
}
export interface IQuestion extends EntityBase {
  code: number;
  title: string;
  sub_questions: ISubQuestion[];
  audio_transcribe: ISentence[];
  answers: string[];
  correct_answer: number;
  original_explanation: string;
  explanation: string;
  audio_url: string;
  audio_duration: number;
  image_url: string;
  image_urls: string[];
  statement: string;
  part: number;
  index: number;
  exam: string;
}
