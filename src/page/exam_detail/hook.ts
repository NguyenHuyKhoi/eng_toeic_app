import { DB } from "@data";
import { IExam, IExamPart } from "@model";
import { useCallback, useEffect, useState } from "react";

export function useExam({
  exam_id,
  part_indexes,
}: {
  exam_id: string;
  part_indexes?: number[];
}) {
  const [exam, setExam] = useState<IExam | undefined>();
  const [parts, setParts] = useState<IExamPart[]>([]);

  const getExam = useCallback(() => {
    const exam_detail = DB.exam_detail(exam_id);
    setExam(exam_detail);
  }, [exam_id]);

  useEffect(() => {
    getExam();
  }, [getExam]);

  const getParts = useCallback(() => {
    if (part_indexes == null) {
      setParts([]);
      return;
    }
    const questions = DB.questions({ exam_id, parts: part_indexes });
    const part_list: IExamPart[] = part_indexes.map((part_index) => ({
      index: part_index,
      questions: questions.filter((u) => u.part === part_index),
    }));
    setParts(part_list);
  }, [part_indexes, exam_id]);

  useEffect(() => {
    getParts();
  }, [getParts]);

  return { exam, parts };
}
