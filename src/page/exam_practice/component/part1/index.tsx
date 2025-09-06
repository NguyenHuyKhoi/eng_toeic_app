import { useExam, useSelector, useUI } from "@common";
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

  const { getOptionColor } = useExam({});
  const { is_mobile, window_width } = useUI();
  const showed_correct = showed_answers.includes(data.index);

  return (
    <div
      style={{
        borderRadius: "6px",
        border: `1px solid ${COLORS.bright_Gray}`,
        marginBottom: is_mobile ? "32px" : "60px",
        backgroundColor: "#fff",
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
                width: is_mobile
                  ? window_width * 0.9
                  : showed_correct
                  ? "400px"
                  : "520px",
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
        {showed_correct && !is_mobile && (
          <div style={{ marginLeft: "12px", width: "400px" }}>
            <TranscriptList data={data} />
          </div>
        )}
      </div>
      {showed_correct && is_mobile && (
        <div style={{ padding: "12px 8px" }}>
          <TranscriptList data={data} />
        </div>
      )}
      <div>
        <Row>
          {["A", "B", "C", "D"].map((option, idx) => (
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: getOptionColor(data, idx),
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
  const { is_mobile } = useUI();
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
    <div
      style={{
        paddingTop: is_mobile ? 0 : "20px",
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
