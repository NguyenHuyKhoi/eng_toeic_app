import { useSelector } from "@common";
import { AudioPlayer } from "@component";
import { IExamPart, IQuestion } from "@model";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Col, Row, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { QuestionHeader } from "../common/question_header";
import { TranscriptList } from "../common/transcript";

function Question({ data }: { data: IQuestion }) {
  const dispatch = useDispatch();
  const { user_answers, showed_answers } = useSelector((x) => x.practice);
  const [audio_play, setAudioPlay] = useState<boolean>(false);
  const { image_url, audio_url, audio_duration } = data;

  const showed_correct = showed_answers.includes(data.index);
  return (
    <div
      style={{
        borderRadius: "6px",
        border: `1px solid ${COLORS.bright_Gray}`,
        marginBottom: "60px",
      }}
    >
      <QuestionHeader question_indexes={[data.index]} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{}}
            onClick={() => {
              setAudioPlay(!audio_play);
            }}
          >
            <img
              src={image_url}
              style={{
                width: showed_correct ? "400px" : "460px",
                aspectRatio: 1.5,
                cursor: "pointer",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <AudioPlayer
              audio_playing={audio_play}
              audio_url={audio_url}
              audio_duration={audio_duration}
            />
          </div>
        </div>
        {showed_correct && (
          <div style={{ marginLeft: "12px", width: "400px" }}>
            <TranscriptList data={data} />
          </div>
        )}
      </div>
      <div>
        <Row>
          {["A", "B", "C", "D"].map((option, idx) => (
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  showed_answers.includes(data.index) &&
                  data.correct_answer === idx
                    ? COLORS.DarkSpringGreen
                    : user_answers[data.index] == idx
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
                    question_index: data.index,
                    answer: idx,
                  })
                );
              }}
            >
              <Typography.Text
                style={{
                  fontSize: "26px",
                  fontWeight: "500",
                  color:
                    showed_correct && data.correct_answer === idx
                      ? COLORS.white
                      : user_answers[data.index] == idx
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
export function Part1({ data }: { data: IExamPart }) {
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

  console.log("Question index: ", question_index);
  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {data.questions.map((question, q_index) => (
        <div
          ref={(el) => {
            questionRefs.current[q_index + 1] = el;
          }}
          style={{}}
        >
          <Question data={question} />
        </div>
      ))}
    </div>
  );
}
