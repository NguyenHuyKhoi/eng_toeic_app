import { useSelector } from "@common";
import { AudioPlayer } from "@component";
import { IExamPart, IQuestion, QUESTION_BEFORE_PART } from "@model";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Col, Row, Typography } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { QuestionHeader } from "../common/question_header";
import { TranscriptList } from "../common/transcript";

function Question({ data }: { data: IQuestion }) {
  const { user_answers, showed_answers } = useSelector((x) => x.practice);
  const dispatch = useDispatch();
  const { audio_url, audio_duration } = data;

  const q_index = QUESTION_BEFORE_PART[2] + data.index;
  const showed_correct = showed_answers.includes(q_index);

  return (
    <div
      style={{
        marginBottom: "50px",
        borderRadius: "6px",
        border: `1px solid ${COLORS.bright_Gray}`,
      }}
    >
      <QuestionHeader
        question_indexes={[QUESTION_BEFORE_PART[2] + data.index]}
      />

      <div style={{ width: "600px" }}>
        <AudioPlayer audio_url={audio_url} audio_duration={audio_duration} />
      </div>
      {showed_correct && (
        <div style={{ padding: "6px 12px" }}>
          <TranscriptList data={data} />
        </div>
      )}

      <div>
        <Row>
          {["A", "B", "C"].map((option, option_idx) => (
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  showed_correct && data.correct_answer === option_idx
                    ? COLORS.DarkSpringGreen
                    : user_answers[q_index] == option_idx
                    ? "#35509ADD"
                    : "#fff",
                borderRadius: "2px",
                border: `1px solid ${COLORS.BrightGray}`,
                cursor: "pointer",
                padding: "6px 0px",
              }}
              onClick={() => {
                dispatch(
                  practiceActions.selectAnswer({
                    question_index: q_index,
                    answer: option_idx,
                  })
                );
              }}
            >
              <Typography.Text
                style={{
                  fontSize: "26px",
                  fontWeight: "500",
                  color:
                    showed_correct && data.correct_answer === option_idx
                      ? COLORS.white
                      : user_answers[q_index] == option_idx
                      ? COLORS.white
                      : COLORS.nickel,
                }}
              >
                {option}
              </Typography.Text>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
export function Part2({ data }: { data: IExamPart }) {
  const { question_index } = useSelector((x) => x.practice);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (question_index !== -1 && questionRefs.current[question_index]) {
      questionRefs.current[question_index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [question_index]);

  return (
    <Col style={{ paddingTop: "30px" }}>
      {data.questions.map((question, q_index) => (
        <div
          ref={(el) => {
            questionRefs.current[QUESTION_BEFORE_PART[2] + q_index + 1] = el;
          }}
        >
          <Question data={question} />
        </div>
      ))}
    </Col>
  );
}
