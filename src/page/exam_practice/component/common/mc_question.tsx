import { useExam, useSelector, useUI } from "@common";
import { IQuestion, ISubQuestion } from "@model";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Radio, Tooltip, Typography } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export function MCQuestion({
  data,
  index,
  enable_show_correct,
}: {
  data: IQuestion | ISubQuestion;
  index: number;
  enable_show_correct?: boolean;
}) {
  const dispatch = useDispatch();
  const { user_answers, showed_answers } = useSelector((x) => x.practice);
  const { title, answers } = data;

  const showed_correct = showed_answers.includes(index);
  const selected_answer = user_answers[index];

  const { getOptionColor } = useExam({});

  const renderShowAnswer = useCallback(() => {
    return (
      <Tooltip title={showed_correct ? "Hide answer" : "Show answer"}>
        <div
          style={{ padding: is_mobile ? "4px 2px" : 0 }}
          onClick={() => {
            if (showed_correct) {
              dispatch(practiceActions.hideCorrectAnswer([index]));
            } else {
              dispatch(practiceActions.showCorrectAnswer([index]));
            }
          }}
        >
          <Typography.Text
            style={{
              fontSize: showed_correct ? "20px" : "16px",
              cursor: "pointer",
              marginTop: showed_correct ? 0 : "4px",
            }}
          >
            {showed_correct ? "🙈" : "✨"}
          </Typography.Text>
        </div>
      </Tooltip>
    );
  }, [showed_correct, dispatch, index]);

  const { is_mobile } = useUI();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        // backgroundColor: "red",
        ...(is_mobile ? { padding: "6px 12px" } : { padding: "10px 6px" }),
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {!is_mobile && (
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "40px",
              backgroundColor: "#E8F2FF",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography.Text
              style={{
                color: "#35509A",
                fontSize: index < 100 ? "15px" : "13px",
                fontWeight: "600",
              }}
            >
              {index}
            </Typography.Text>
          </div>
        )}
        {enable_show_correct && !is_mobile && renderShowAnswer()}
      </div>
      <div
        style={{
          marginLeft: is_mobile ? 0 : "12px",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        {title && (
          <div>
            <Typography.Text
              style={{
                fontSize: is_mobile ? "15px" : "15px",
                fontWeight: "500",
                color: COLORS.DarkCharcoal,
              }}
            >
              {is_mobile && (
                <Typography.Text
                  style={{
                    color: "#35509A",
                    fontWeight: "700",
                    fontSize: "15px",
                  }}
                >
                  {index + ". "}
                </Typography.Text>
              )}
              {title.replace(/^\d+\.\s*/, "")}
            </Typography.Text>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex", flex: 1 }}>
            <Radio.Group value={selected_answer}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {answers.map((answer, answer_index) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      ...(is_mobile
                        ? { padding: "2px 0px" }
                        : { padding: "2px 0px" }),
                    }}
                  >
                    <Radio
                      key={answer_index}
                      value={answer_index}
                      onClick={() => {
                        dispatch(
                          practiceActions.selectAnswer({
                            question_index: index,
                            answer: answer_index,
                          })
                        );
                      }}
                      style={{
                        fontWeight:
                          showed_correct && answer_index === data.correct_answer
                            ? "600"
                            : "400",
                        color: getOptionColor(
                          {
                            index,
                            correct_answer: data.correct_answer,
                          } as IQuestion,
                          answer_index,
                          "#000"
                        ),
                      }}
                    >
                      {"ABCD"[answer_index] + ". " + answer}
                    </Radio>
                  </div>
                ))}
              </div>
            </Radio.Group>
          </div>
          {is_mobile && renderShowAnswer()}
        </div>
      </div>
    </div>
  );
}
