import { IQuestion, ISubQuestion } from "@model";
import { COLORS } from "@theme";
import { Radio, Typography } from "antd";

export function MCQuestion({
  data,
  index,
}: {
  data: IQuestion | ISubQuestion;
  index: number;
}) {
  const { title, answers } = data;
  return (
    <div style={{ display: "flex", flexDirection: "row", marginTop: "16px" }}>
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
      <div style={{ marginLeft: "12px" }}>
        {title && (
          <div>
            <Typography.Text
              style={{ fontSize: "16px", color: COLORS.DarkCharcoal }}
            >
              {title.replace(/^\d+\.\s*/, "")}
            </Typography.Text>
          </div>
        )}
        <Radio.Group>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {answers.map((answer, answer_index) => (
              <Radio value={answer_index} style={{ margin: "3px 0px" }}>
                {"ABCD"[answer_index] + ". " + answer}
              </Radio>
            ))}
          </div>
        </Radio.Group>
      </div>
    </div>
  );
}
