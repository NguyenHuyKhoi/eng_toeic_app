/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "@common";
import { IExam, IExamPart, IQuestion, ISubQuestion } from "@model";
import { Api } from "@service";
import { COLORS } from "@theme";
import { useCallback, useEffect, useState } from "react";
export const useUI = () => {
  const [is_mobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    // Cập nhật lần đầu
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setIsMobile(mediaQuery.matches);

    const listener = (e: any) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return {
    is_mobile,
    window_width: windowSize.width,
    window_height: windowSize.height,
  };
};

export function useExam({
  exam_id,
  part_indexes,
}: {
  exam_id?: string;
  part_indexes?: number[];
}) {
  const { showed_answers, user_answers } = useSelector((x) => x.practice);
  const [exam, setExam] = useState<IExam | undefined>();
  const [parts, setParts] = useState<IExamPart[]>([]);

  const getExam = useCallback(async () => {
    if (exam_id == null) {
      return;
    }
    const exam_detail = await Api.exam.show(exam_id);
    setExam(exam_detail);
  }, [exam_id]);

  useEffect(() => {
    getExam();
  }, [getExam]);

  const getParts = useCallback(async () => {
    if (part_indexes == null) {
      setParts([]);
      return;
    }

    const questions = await Api.question.index({
      exam: exam_id,
      parts: part_indexes,
      all: true,
    });
    const part_list: IExamPart[] = part_indexes.map((part_index) => ({
      index: part_index,
      questions: questions.data.filter((u) => u.part === part_index),
    }));
    setParts(part_list);
  }, [part_indexes, exam_id]);

  const getOptionColor = (
    question: IQuestion,
    option_idx: number,
    default_color: string | undefined = "#fff"
  ) => {
    if (showed_answers.includes(question.index)) {
      if (question.correct_answer === option_idx) {
        return COLORS.DarkSpringGreen;
      }
      if (user_answers[question.index] === option_idx) {
        return COLORS.Crimson;
      }
      return default_color;
    }
    if (user_answers[question.index] === option_idx) {
      return "#35509ADD";
    }
    return default_color;
  };
  useEffect(() => {
    getParts();
  }, [getParts]);

  return { exam, parts, getOptionColor };
}
