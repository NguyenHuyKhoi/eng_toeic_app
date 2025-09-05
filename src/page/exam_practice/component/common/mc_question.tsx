import { useSelector } from "@common";
import { IQuestion, ISubQuestion } from "@model";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Radio, Typography } from "antd";
import { useDispatch } from "react-redux";

export function MCQuestion({
  data,
  index,
}: {
  data: IQuestion | ISubQuestion;
  index: number;
}) {
  const dispatch = useDispatch();
  const { user_answers, showed_answers } = useSelector((x) => x.practice);
  const { title, answers } = data;

  const showed_correct = showed_answers.includes(index);
  const selected_answer = user_answers[index];
  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
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
              fontSize: "15px",
              fontWeight: "600",
            }}
          >
            {index}
          </Typography.Text>
        </div>
      </div>
      <div
        style={{
          marginLeft: "12px",
          display: "flex",
          flex: 1,
          flexDirection: "column",
        }}
      >
        {title && (
          <div>
            <Typography.Text
              style={{ fontSize: "16px", color: COLORS.DarkCharcoal }}
            >
              {title.replace(/^\d+\.\s*/, "")}
            </Typography.Text>
          </div>
        )}
        <Radio.Group value={selected_answer}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {answers.map((answer, answer_index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Radio
                  key={answer_index}
                  value={answer_index}
                  style={{ margin: "3px 0px" }}
                  onClick={() => {
                    dispatch(
                      practiceActions.selectAnswer({
                        question_index: index,
                        answer: answer_index,
                      })
                    );
                  }}
                >
                  {"ABCD"[answer_index] + ". " + answer}
                </Radio>
                {showed_correct && answer_index === data.correct_answer && (
                  <Typography.Text
                    style={{ fontSize: "12px", marginLeft: "16px" }}
                  >
                    ✅
                  </Typography.Text>
                )}
              </div>
            ))}
          </div>
        </Radio.Group>
      </div>
    </div>
  );
}
