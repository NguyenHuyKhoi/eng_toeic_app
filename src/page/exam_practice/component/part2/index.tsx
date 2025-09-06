import { useExam, useSelector, useUI } from "@common";
import { AudioPlayer } from "@component";
import { IExamPart, IQuestion, QUESTION_BEFORE_PART } from "@model";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Col, Radio, Row } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { QuestionHeader } from "../common/question_header";
import { TranscriptList } from "../common/transcript";

function Question({ data }: { data: IQuestion }) {
  const { user_answers, showed_answers } = useSelector((x) => x.practice);
  const dispatch = useDispatch();

  const { getOptionColor } = useExam({});
  const { audio_url, audio_duration } = data;

  const q_index = QUESTION_BEFORE_PART[2] + data.index;
  const showed_correct = showed_answers.includes(q_index);

  const { is_mobile } = useUI();
  return (
    <div
      style={{
        marginBottom: is_mobile ? "40px" : "50px",
        borderRadius: "6px",
        border: `1px solid ${COLORS.bright_Gray}`,
        backgroundColor: "#fff",
      }}
    >
      <QuestionHeader
        question_indexes={[QUESTION_BEFORE_PART[2] + data.index]}
      />

      <div style={{ width: is_mobile ? "95vw" : "600px" }}>
        <AudioPlayer audio_url={audio_url} audio_duration={audio_duration} />
      </div>
      {showed_correct && (
        <div style={{ padding: "6px 12px" }}>
          <TranscriptList data={data} />
        </div>
      )}

      <Radio.Group value={user_answers[q_index]} style={{ width: "100%" }}>
        <Row style={{ width: "100%" }}>
          {["A", "B", "C"].map((option, idx) => (
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                border: `1px solid ${COLORS.BrightGray}`,
                cursor: "pointer",
                padding: "6px 0px",
              }}
              onClick={() => {
                dispatch(
                  practiceActions.selectAnswer({
                    question_index: q_index,
                    answer: idx,
                  })
                );
              }}
            >
              <Radio
                value={idx}
                style={{
                  fontSize: "20px",
                  fontWeight:
                    showed_correct && data.correct_answer === idx
                      ? "900"
                      : "400",
                  color: getOptionColor(
                    {
                      index: q_index,
                      correct_answer: data.correct_answer,
                    } as IQuestion,
                    idx,
                    "#000"
                  ),
                }}
              >
                {option}
              </Radio>
            </Col>
          ))}
        </Row>
      </Radio.Group>
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

  const { is_mobile } = useUI();
  return (
    <Col style={{ paddingTop: is_mobile ? 0 : "20px" }}>
      {data.questions.map((question, q_index) => (
        <div
          ref={(el) => {
            questionRefs.current[QUESTION_BEFORE_PART[2] + q_index + 1] = el;
          }}
        >
          <Question data={question} />
        </div>
      ))}
      <div style={{ height: "60px", width: "100px" }} />
    </Col>
  );
}
