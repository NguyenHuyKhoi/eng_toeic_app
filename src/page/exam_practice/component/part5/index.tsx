import { useSelector } from "@common";
import { IExamPart } from "@model";
import { Col } from "antd";
import { useEffect, useRef } from "react";
import { MCQuestion } from "../mc_question";
import { COLORS } from "@theme";

export function Part5({ data }: { data: IExamPart }) {
  const { question_index } = useSelector((x) => x.practice);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (question_index !== -1 && sentenceRefs.current[question_index]) {
      sentenceRefs.current[question_index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [question_index]);

  return (
    <Col style={{ paddingTop: "30px" }}>
      {data.questions.map((question, q_index) => (
        <div
          ref={(el) => (sentenceRefs.current[q_index] = el)}
          style={{
            width: "800px",
            borderBottom: `1px solid ${COLORS.BrightGray}`,
            paddingBottom: "16px",
          }}
        >
          <MCQuestion
            index={q_index + 1}
            data={{ ...question, title: question.statement }}
          />
        </div>
      ))}
    </Col>
  );
}
