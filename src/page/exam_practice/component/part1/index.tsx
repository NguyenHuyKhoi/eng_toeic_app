import { useSelector } from "@common";
import { AudioPlayer } from "@component";
import { IExamPart, IQuestion } from "@model";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Col, Row, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

function Question({ data }: { data: IQuestion }) {
  const dispatch = useDispatch();
  const { user_answers } = useSelector((x) => x.practice);
  const [audio_play, setAudioPlay] = useState<boolean>(false);
  const { image_url, audio_url, audio_duration } = data;
  return (
    <div
      style={{
        marginBottom: "80px",
        borderRadius: "6px",
        border: `1px solid ${COLORS.bright_Gray}`,
      }}
    >
      <div style={{ borderBottom: `2px solid ${COLORS.bright_Gray}` }}>
        <Typography.Title
          level={5}
          style={{ paddingTop: "12px", paddingLeft: "10px", marginTop: "0px" }}
        >
          {`Question ${data.index}`}{" "}
        </Typography.Title>
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{}}
          onClick={() => {
            setAudioPlay(!audio_play);
          }}
        >
          <img
            src={image_url}
            style={{ width: "600px", aspectRatio: 1.5, cursor: "pointer" }}
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
                  user_answers[data.index] == idx ? "#35509ADD" : "#fff",
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
                    user_answers[data.index] == idx
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
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (question_index !== -1 && sentenceRefs.current[question_index]) {
      sentenceRefs.current[question_index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [question_index]);

  return (
    <div style={{ marginTop: "20px" }}>
      {data.questions.map((question, q_index) => (
        <div
          ref={(el) => {
            sentenceRefs.current[q_index] = el;
          }}
        >
          <Question data={question} />
        </div>
      ))}
    </div>
  );
}
