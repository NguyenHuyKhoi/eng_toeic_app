import { useSelector, useUI } from "@common";
import { AudioPlayer } from "@component";
import { IExamPart, IQuestion, QUESTION_BEFORE_PART } from "@model";
import { COLORS } from "@theme";
import { Button, Typography } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { MCQuestion } from "../common/mc_question";
import { QuestionHeader } from "../common/question_header";
import { TranscriptList } from "../common/transcript";
import { useDispatch } from "react-redux";
import { practiceActions } from "@redux";

function Question({
  data,
  before_question_num,
}: {
  data: IQuestion;
  before_question_num: number;
}) {
  const dispatch = useDispatch();
  const { showed_answers } = useSelector((x) => x.practice);
  const [audio_play] = useState<boolean>(false);
  const { audio_url, audio_duration } = data;
  const [play_time, setPlayTime] = useState<number>(0);

  const [mobile_transcript_show, setMobileTranscriptShow] =
    useState<boolean>(false);
  const { is_mobile, viewport_width } = useUI();
  const showed_correct = showed_answers.includes(before_question_num + 1);

  const renderSubQuestions = useCallback(() => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: is_mobile ? "100%" : showed_correct ? "460px" : "600px",
            padding: is_mobile ? "2px 0px" : "12px 12px",
            borderRight:
              showed_correct && !is_mobile
                ? `1px solid ${COLORS.BrightGray}`
                : undefined,
          }}
        >
          {data.sub_questions.map((sub_question, sub_index) => {
            return (
              <div
                style={{
                  ...(is_mobile
                    ? {
                        borderBottom:
                          sub_index < data.sub_questions.length - 1
                            ? `2px solid ${COLORS.BrightGray}`
                            : undefined,
                      }
                    : {}),
                }}
              >
                <MCQuestion
                  data={sub_question}
                  index={before_question_num + sub_index + 1}
                  enable_show_correct={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [is_mobile, showed_correct, data, before_question_num]);

  const renderTranscript = () => {
    return (
      <div
        style={
          is_mobile
            ? { width: "100%", padding: "8px 10px" }
            : { marginLeft: "12px", width: "400px", marginTop: "40px" }
        }
      >
        <TranscriptList data={data} focus_time={play_time} />
      </div>
    );
  };

  useEffect(() => {
    if (is_mobile && showed_correct) {
      setMobileTranscriptShow(false);
    }
  }, [showed_correct, is_mobile]);

  const question_indexes = new Array(data.sub_questions.length)
    .fill(0)
    .map((_, i) => before_question_num + i + 1);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "4px",
        border: `2px solid ${COLORS.BrightGray}`,
        width: "100%",
        margin: is_mobile ? "0px 0px 20px 0px" : "0px 16px 50px 16px",
        backgroundColor: "#fff",
      }}
    >
      <QuestionHeader question_indexes={question_indexes} />

      <div
        style={{
          width: is_mobile ? "100%" : showed_correct ? "100%" : "600px",
          alignSelf: "center",
        }}
      >
        <AudioPlayer
          audio_playing={audio_play}
          onChangePlayTime={setPlayTime}
          audio_url={audio_url}
          audio_duration={audio_duration}
        />
      </div>

      {!is_mobile ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {renderSubQuestions()}
          {showed_correct && renderTranscript()}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {mobile_transcript_show ? renderTranscript() : renderSubQuestions()}
        </div>
      )}
      {showed_correct && is_mobile && (
        <div
          style={{
            marginBottom: "8px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0px 12px",
          }}
        >
          <div style={{ width: "30px" }} />
          <Button
            variant="outlined"
            style={{}}
            onClick={() => {
              setMobileTranscriptShow(!mobile_transcript_show);
            }}
          >
            {mobile_transcript_show ? "View questions" : "View transcript"}
          </Button>
          <Typography.Text
            onClick={() => {
              dispatch(practiceActions.hideCorrectAnswer(question_indexes));
            }}
            style={{
              fontSize: "20px",
            }}
          >
            {"🙈"}
          </Typography.Text>
        </div>
      )}
    </div>
  );
}
export function Part3_4({ data }: { data: IExamPart }) {
  const { question_index } = useSelector((x) => x.practice);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (question_index == -1) {
      return;
    }
    const sub_part_index = Math.ceil(
      (question_index - QUESTION_BEFORE_PART[data.index]) / 3
    );
    console.log("Question index check: ", question_index, sub_part_index);
    if (questionRefs.current[sub_part_index]) {
      questionRefs.current[sub_part_index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [question_index, data.index]);

  const { is_mobile } = useUI();
  return (
    <div
      style={{
        paddingTop: is_mobile ? "0px" : "20px",
        display: "flex",
        flexDirection: "column",
        ...(is_mobile ? { paddingRight: "10px" } : { alignItems: "center" }),
      }}
    >
      {data.questions.map((question, q_index) => {
        const before_question_num = data.questions.reduce(
          (s, item) =>
            (s += item.index < question.index ? item.sub_questions.length : 0),
          QUESTION_BEFORE_PART[data.index]
        );

        return (
          <div
            ref={(el) => {
              questionRefs.current[q_index + 1] = el;
            }}
            key={question.id}
            style={{}}
          >
            <Question
              data={question}
              before_question_num={before_question_num}
            />
          </div>
        );
      })}
      <div style={{ height: "60px", width: "100px" }} />
    </div>
  );
}
