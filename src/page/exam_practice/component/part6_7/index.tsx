import { useSelector, useUI } from "@common";
import { IExamPart, IQuestion, QUESTION_BEFORE_PART } from "@model";
import { COLORS } from "@theme";
import { Button, Col, Row, Typography } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { MCQuestion } from "../common/mc_question";
import { images } from "@asset";
import { QuestionHeader } from "../common/question_header";
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
  const { part_index, showed_answers } = useSelector((x) => x.practice);
  const { image_urls } = data;
  const [mobile_show_image, setMobileShowImage] = useState<boolean>(false);

  const { is_mobile, viewport_width, viewport_height } = useUI();
  const renderImages = useCallback(() => {
    return (
      <>
        {image_urls.length === 0 ? (
          <img
            src={images.no_image}
            style={{
              width: is_mobile ? "90vw" : "90%",
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
                maxWidth: is_mobile ? "90vw" : "500px",
                maxHeight: is_mobile ? "40vh" : "600px",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                alignSelf: "center",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            />
          ))
        )}
      </>
    );
  }, [image_urls, is_mobile]);

  const renderSubQuestions = useCallback(() => {
    return (
      <>
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
              />
            </div>
          );
        })}
      </>
    );
  }, [data.sub_questions, is_mobile, before_question_num]);

  const question_indexes = new Array(data.sub_questions.length)
    .fill(0)
    .map((_, i) => before_question_num + i + 1);

  const showed_correct =
    question_indexes.length > 0
      ? showed_answers.includes(question_indexes[0])
      : false;

  useEffect(() => {
    if (is_mobile && showed_correct) {
      setMobileShowImage(false);
    }
  }, [showed_correct, is_mobile]);
  return (
    <Row
      style={{
        borderRadius: "6px",
        border: `2px solid ${COLORS.BrightGray}`,
        margin: is_mobile ? "0px 0px 20px 0px" : "0px 16px 50px 16px",
        display: "flex",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <div style={{ width: "100%" }}>
        <QuestionHeader question_indexes={question_indexes} />
      </div>
      {!is_mobile ? (
        <Row style={{ width: "100%" }}>
          <Col
            span={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {renderImages()}
          </Col>

          <Col span={12} style={{}}>
            {renderSubQuestions()}
          </Col>
        </Row>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {part_index === 6 ? (
            <>
              {renderImages()} {renderSubQuestions()}
            </>
          ) : mobile_show_image ? (
            renderImages()
          ) : (
            renderSubQuestions()
          )}

          {part_index === 7 && is_mobile && (
            <div
              style={{
                alignSelf: "center",
                marginTop: "auto",
                marginBottom: "8px",
              }}
            >
              <Button onClick={() => setMobileShowImage(!mobile_show_image)}>
                {mobile_show_image ? "View questions" : "View images"}
              </Button>
            </div>
          )}
        </div>
      )}

      {data.sub_questions.length >= 4 && (
        <Typography.Text
          onClick={() => {
            if (showed_correct) {
              dispatch(practiceActions.hideCorrectAnswer(question_indexes));
            } else {
              dispatch(practiceActions.showCorrectAnswer(question_indexes));
            }
          }}
          style={{
            fontSize: "20px",
            position: "absolute",
            right: "8px",
            bottom: "10px",
          }}
        >
          {showed_correct ? "🙈" : "✨"}
        </Typography.Text>
      )}
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

  const { is_mobile } = useUI();
  return (
    <Col style={{ paddingTop: is_mobile ? "10px" : "30px" }}>
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
            style={{}}
          >
            <Question
              before_question_num={before_question_num}
              data={question}
            />
          </div>
        );
      })}
      <div style={{ height: "60px", width: "100px" }} />
    </Col>
  );
}
