import { useSelector } from "@common";
import { AudioPlayer } from "@component";
import { IExamPart, IQuestion, QUESTION_BEFORE_PART } from "@model";
import { COLORS } from "@theme";
import { Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { MCQuestion } from "../common/mc_question";
import { TranscriptList } from "../common/transcript";
import { QuestionHeader } from "../common/question_header";

function Question({
  data,
  before_question_num,
}: {
  data: IQuestion;
  before_question_num: number;
}) {
  const { showed_answers } = useSelector((x) => x.practice);
  const [audio_play] = useState<boolean>(false);
  const { audio_url, audio_duration } = data;
  const [play_time, setPlayTime] = useState<number>(0);

  const showed_correct = showed_answers.includes(before_question_num + 1);
  return (
    <div
      style={{
        borderRadius: "4px",
        border: `2px solid ${COLORS.BrightGray}`,

        margin: "0px 16px 50px 16px",
      }}
    >
      <QuestionHeader
        question_indexes={new Array(data.sub_questions.length)
          .fill(0)
          .map((_, i) => before_question_num + i + 1)}
      />

      <AudioPlayer
        audio_playing={audio_play}
        audio_url={audio_url}
        audio_duration={audio_duration}
        onChangePlayTime={setPlayTime}
      />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            width: showed_correct ? "460px" : "600px",
            padding: "12px 12px",
            borderRight: showed_correct
              ? `1px solid ${COLORS.BrightGray}`
              : undefined,
          }}
        >
          {data.sub_questions.map((sub_question, sub_index) => {
            return (
              <MCQuestion
                data={sub_question}
                index={before_question_num + sub_index + 1}
              />
            );
          })}
        </div>
        {showed_correct && (
          <div
            style={{ marginLeft: "12px", width: "400px", marginTop: "40px" }}
          >
            <TranscriptList data={data} focus_time={play_time} />
          </div>
        )}
      </div>
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

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
          >
            <Question
              data={question}
              before_question_num={before_question_num}
            />
          </div>
        );
      })}
    </div>
  );
}
