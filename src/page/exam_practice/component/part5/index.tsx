import { useSelector, useUI } from "@common";
import { IExamPart, QUESTION_BEFORE_PART } from "@model";
import { Col } from "antd";
import { useEffect, useRef } from "react";
import { MCQuestion } from "../common/mc_question";
import { COLORS } from "@theme";
import { WidthFull } from "@mui/icons-material";

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

  const { is_mobile, window_width } = useUI();
  return (
    <Col
      style={{
        paddingTop: is_mobile ? "0px" : "0px",
      }}
    >
      {data.questions.map((question, q_index) => (
        <div
          ref={(el) => {
            questionRefs.current[QUESTION_BEFORE_PART[5] + q_index + 1] = el;
          }}
          style={{
            backgroundColor: "#fff",
            borderRadius: "4px",
            border: `2px solid ${COLORS.BrightGray}`,
            ...(is_mobile
              ? { margin: "0px 0px 20px 0px" }
              : {
                  width: "800px",
                  padding: "4px 10px",
                  margin: "0px 0px 30px 0px",
                }),
          }}
        >
          <MCQuestion
            index={QUESTION_BEFORE_PART[5] + q_index + 1}
            data={{ ...question, title: question.statement }}
            enable_show_correct
          />
        </div>
      ))}
    </Col>
  );
}
