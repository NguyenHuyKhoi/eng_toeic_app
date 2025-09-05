import { EntityBase } from "./common";
import { IQuestion } from "./question";

export type ToeicExamSource = "ETS";
export interface IExam extends EntityBase {
  source: ToeicExamSource;
  year: number;
  index: number;
}

export interface IExamPart {
  index: number;
  questions: IQuestion[];
  question_num?: number;
}
export const QUESTION_BEFORE_PART: Record<number, number> = {
  1: 0,
  2: 6,
  3: 31,
  4: 70,
  5: 100,
  6: 130,
  7: 146,
};
export const TOEIC_PARTS: (Partial<IExamPart> & { question_before: number })[] =
  [
    {
      index: 1,
      question_num: 6,
      question_before: 0,
    },
    {
      index: 2,
      question_num: 25,
      question_before: 6,
    },
    {
      index: 3,
      question_num: 39,
      question_before: 31,
    },
    {
      index: 4,
      question_num: 30,
      question_before: 70,
    },
    {
      index: 5,
      question_num: 30,
      question_before: 100,
    },
    {
      index: 6,
      question_num: 16,
      question_before: 130,
    },
    {
      index: 7,
      question_num: 54,
      question_before: 146,
    },
  ];
