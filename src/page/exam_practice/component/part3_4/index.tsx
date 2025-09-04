import { IExamPart, IQuestion } from "@model";
import { COLORS } from "@theme";
import { Col, Radio, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "@common";
import { AudioPlayer } from "@component";
import { MCQuestion } from "../mc_question";

function Question({ data }: { data: IQuestion }) {
  const [audio_play] = useState<boolean>(false);
  const { audio_url, audio_duration } = data;
  return (
    <div
      style={{
        borderRadius: "6px",
        border: `1px solid ${COLORS.AzureishWhite}`,
        padding: "12px 20px",
        margin: "0px 16px 50px 16px",
      }}
    >
      <div style={{ width: "600px" }}>
        <AudioPlayer
          audio_playing={audio_play}
          audio_url={audio_url}
          audio_duration={audio_duration}
        />
      </div>

      {data.sub_questions.map((sub_question, sub_index) => {
        return (
          <MCQuestion
            data={sub_question}
            index={data.index * 3 - 2 + sub_index}
          />
        );
      })}
    </div>
  );
}
export function Part3_4({ data }: { data: IExamPart }) {
  const { question_index } = useSelector((x) => x.practice);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sub_part_index = Math.floor(question_index / 3);
    console.log("Sub part: ", sub_part_index, question_index);
    if (question_index !== -1 && sentenceRefs.current[sub_part_index]) {
      sentenceRefs.current[sub_part_index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [question_index]);

  return (
    <Col style={{ paddingTop: "30px" }}>
      {data.questions.map((question, q_index) => (
        <div ref={(el) => (sentenceRefs.current[q_index] = el)}>
          <Question data={question} />
        </div>
      ))}
    </Col>
  );
}
