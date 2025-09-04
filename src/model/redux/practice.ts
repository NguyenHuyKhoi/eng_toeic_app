import { IExam } from "../exam";

export interface PracticeReduxState {
  exam?: IExam;
  part_index: number;
  question_index: number;
}
