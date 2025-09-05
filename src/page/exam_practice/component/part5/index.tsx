import { useSelector } from "@common";
import { IExamPart, QUESTION_BEFORE_PART } from "@model";
import { Col } from "antd";
import { useEffect, useRef } from "react";
import { MCQuestion } from "../common/mc_question";
import { COLORS } from "@theme";

export function Part5({ data }: { data: IExamPart }) {
  const { question_index } = useSelector((x) => x.practice);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (question_index !== -1 && questionRefs.current[question_index]) {
      questionRefs.current[question_index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [question_index]);

  return (
    <Col style={{ paddingTop: "30px" }}>
      {data.questions.map((question, q_index) => (
        <div
          ref={(el) => {
            questionRefs.current[QUESTION_BEFORE_PART[5] + q_index + 1] = el;
          }}
          style={{
            width: "800px",
            // borderBottom: `1px solid ${COLORS.BrightGray}`,
            paddingBottom: "2px",
          }}
        >
          <MCQuestion
            index={QUESTION_BEFORE_PART[5] + q_index + 1}
            data={{ ...question, title: question.statement }}
          />
          <div
            style={{
              marginLeft: "40px",
              marginRight: "40px",
              height: "2px",
              alignSelf: "center",
              backgroundColor: COLORS.BrightGray,
              marginTop: "16px",
            }}
          />
        </div>
      ))}
    </Col>
  );
}
