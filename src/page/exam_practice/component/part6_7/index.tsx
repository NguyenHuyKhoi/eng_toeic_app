import { useSelector } from "@common";
import { IExamPart, IQuestion, QUESTION_BEFORE_PART } from "@model";
import { COLORS } from "@theme";
import { Col, Row } from "antd";
import { useEffect, useRef } from "react";
import { MCQuestion } from "../common/mc_question";
import { images } from "@asset";
import { QuestionHeader } from "../common/question_header";
function Question({
  data,
  before_question_num,
}: {
  data: IQuestion;
  before_question_num: number;
}) {
  const { image_urls } = data;
  console.log("Image urls: ", image_urls);
  return (
    <Row
      style={{
        borderRadius: "6px",
        border: `2px solid ${COLORS.BrightGray}`,
        padding: "6px 12px",
        margin: "0px 16px 50px 16px",
        display: "flex",
      }}
    >
      <QuestionHeader
        question_indexes={new Array(data.sub_questions.length)
          .fill(0)
          .map((_, i) => before_question_num + i + 1)}
      />
      <Col
        span={14}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {image_urls.length === 0 ? (
          <img
            src={images.no_image}
            style={{
              width: "85%",
              aspectRatio: 1.5,
              alignSelf: "center",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          />
        ) : (
          image_urls.map((img_url) => (
            <img
              onError={(e) => {
                console.log("Error loading image: ", e);
                if (e.currentTarget.src !== images.error_image) {
                  e.currentTarget.src = images.error_image;
                }
              }}
              src={img_url}
              style={{
                width: "85%",
                aspectRatio: 1.5,
                alignSelf: "center",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            />
          ))
        )}
      </Col>

      <Col span={10}>
        {data.sub_questions.map((sub_question, sub_index) => {
          return (
            <MCQuestion
              data={{ ...sub_question, title: null }}
              index={before_question_num + sub_index + 1}
            />
          );
        })}
      </Col>
    </Row>
  );
}
export function Part6_7({ data }: { data: IExamPart }) {
  const { question_index } = useSelector((x) => x.practice);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let group_index = 0;
    let end_index = QUESTION_BEFORE_PART[data.index];
    for (let i = 0; i < data.questions.length; i++) {
      end_index += data.questions[i].sub_questions.length;
      if (end_index >= question_index) {
        group_index = i + 1;
        break;
      }
    }
    if (questionRefs.current[group_index]) {
      questionRefs.current[group_index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data.index, data.questions, question_index]);

  return (
    <Col style={{ paddingTop: "30px", width: "100%" }}>
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
          >
            <Question
              before_question_num={before_question_num}
              data={question}
            />
          </div>
        );
      })}
    </Col>
  );
}
