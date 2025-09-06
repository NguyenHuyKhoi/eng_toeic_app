import { useSelector, useUI } from "@common";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Tooltip, Typography } from "antd";
import { useDispatch } from "react-redux";

export function QuestionHeader({
  question_indexes,
}: {
  question_indexes: number[];
}) {
  const dispatch = useDispatch();
  const { showed_answers } = useSelector((x) => x.practice);
  const is_showed = showed_answers.includes(question_indexes[0]);
  const { is_mobile } = useUI();
  return (
    <Tooltip title={is_showed ? "Hide correct answer" : "Show correct answer"}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `2px solid ${COLORS.bright_Gray}`,
          padding: "2px 12px",
          cursor: "pointer",
        }}
        onClick={() => {
          if (is_showed) {
            dispatch(practiceActions.hideCorrectAnswer(question_indexes));
          } else {
            dispatch(practiceActions.showCorrectAnswer(question_indexes));
          }
        }}
      >
        <Typography.Title
          level={5}
          style={{
            paddingTop: is_mobile ? "6px" : "12px",
            marginTop: "0px",
          }}
        >
          {question_indexes.length === 1
            ? `Question ${question_indexes[0]}`
            : `Question ${question_indexes[0]} - ${
                question_indexes[question_indexes.length - 1]
              }`}
        </Typography.Title>
        <Typography.Text
          style={{
            fontSize: is_showed ? "20px" : "16px",
            cursor: "pointer",
            marginTop: is_showed ? 0 : "4px",
          }}
        >
          {is_showed ? "🙈" : "✨"}
        </Typography.Text>
      </div>
    </Tooltip>
  );
}
