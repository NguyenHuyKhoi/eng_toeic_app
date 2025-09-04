import { IExamPart, IQuestion } from "@model";
import { COLORS } from "@theme";
import { Col, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "@common";
import { AudioPlayer } from "@component";
import { MCQuestion } from "../mc_question";

function Question({ data }: { data: IQuestion }) {
  const [audio_play] = useState<boolean>(false);
  const { image_urls } = data;
  return (
    <Row
      style={{
        borderRadius: "6px",
        border: `1px solid ${COLORS.AzureishWhite}`,
        padding: "12px 20px",
        margin: "0px 16px 50px 16px",
        display: "flex",
      }}
    >
      <Col span={14}>
        {image_urls.map((img_url) => (
          <img
            src={img_url}
            style={{
              width: "500px",
              aspectRatio: 1.5,
            }}
          />
        ))}
      </Col>

      <Col span={8}>
        {data.sub_questions.map((sub_question, sub_index) => {
          return (
            <MCQuestion
              data={{ ...sub_question, title: null }}
              index={data.index * 3 - 2 + sub_index}
            />
          );
        })}
      </Col>
    </Row>
  );
}
export function Part6_7({ data }: { data: IExamPart }) {
  const { question_index } = useSelector((x) => x.practice);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // const sub_part_index = Math.floor(question_index / 3);
    // console.log("Sub part: ", sub_part_index, question_index);
    // if (question_index !== -1 && sentenceRefs.current[sub_part_index]) {
    //   sentenceRefs.current[sub_part_index]?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
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
