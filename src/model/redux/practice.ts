import { IExam } from "../exam";

export interface PracticeReduxState {
  exam?: IExam;
  part_index: number;
  question_index: number;
  year?: number;
  user_answers: (number | null)[];
  question_highlighting?: boolean;

  showed_answers: number[];
}
