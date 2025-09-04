import { IExamPart, IQuestion } from "@model";
import { COLORS } from "@theme";
import { Col, Row, Tooltip, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "@common";
import { AudioPlayer } from "@component";

function Question({ data }: { data: IQuestion }) {
  const [audio_play, setAudioPlay] = useState<boolean>(false);
  const { audio_url, audio_duration } = data;
  return (
    <div
      style={{
        marginBottom: "50px",
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

      <div style={{ width: "600px" }}>
        <AudioPlayer
          audio_playing={audio_play}
          audio_url={audio_url}
          audio_duration={audio_duration}
        />
      </div>

      <div>
        <Row>
          {["A", "B", "C"].map((option) => (
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: "2px",
                border: `1px solid ${COLORS.BrightGray}`,
                cursor: "pointer",
                padding: "6px 0px",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: "26px",
                  fontWeight: "500",
                  color: COLORS.nickel,
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
    <Col style={{ paddingTop: "30px" }}>
      {data.questions.map((question, q_index) => (
        <div
          ref={(el) => {
            sentenceRefs.current[q_index] = el;
          }}
        >
          <Question data={question} />
        </div>
      ))}
    </Col>
  );
}
