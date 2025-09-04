import { useSelector } from "@common";
import { showToast } from "@component";
import { TOEIC_PARTS } from "@model";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Col, Row, Tag, Typography } from "antd";
import { useDispatch } from "react-redux";

export function PartNav({ part_indexes }: { part_indexes: number[] }) {
  const dispatch = useDispatch();
  const { part_index, user_answers } = useSelector((x) => x.practice);
  const display_parts = TOEIC_PARTS.filter((part) =>
    part_indexes.includes(part.index)
  );

  return (
    <Col
      style={{
        width: "300px",
        padding: "12px 12px",
        backgroundColor: COLORS.white,
        borderRadius: "6px",
      }}
    >
      <div style={{ maxHeight: "75vh", overflowY: "scroll" }}>
        {display_parts.map((part) => (
          <Col style={{ paddingBottom: "20px" }}>
            <Typography.Title
              level={5}
              style={{ marginTop: "4px" }}
            >{`Part ${part.index}`}</Typography.Title>
            <Row style={{ flexWrap: "wrap" }}>
              {new Array(part.question_num ?? 0).fill(0).map((_, q_idx) => {
                const answered =
                  user_answers[part.question_before + q_idx + 1] != null;
                return (
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: `1px solid ${COLORS.nickel}`,
                      marginLeft: "6px",
                      marginBottom: "6px",
                      borderRadius: "2px",
                      cursor: "pointer",
                      backgroundColor: answered ? "#35509A" : "#fff",
                    }}
                    onClick={() => {
                      dispatch(practiceActions.selectPart(part.index));
                      dispatch(practiceActions.selectQuestion(q_idx));
                    }}
                  >
                    <Typography.Text
                      style={{
                        color: answered ? COLORS.white : COLORS.DarkCharcoal,
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {q_idx + 1}
                    </Typography.Text>
                  </div>
                );
              })}
            </Row>
          </Col>
        ))}
      </div>

      <div
        style={{
          paddingTop: "12px",
          borderTop: `1px solid ${COLORS.BrightGray}`,
        }}
      >
        {display_parts.map((part) => (
          <Tag
            onClick={() => {
              dispatch(practiceActions.selectPart(part.index));
            }}
            color={part_index === part.index ? "blue" : "default"}
            key={part.index}
            style={{ cursor: "pointer", marginLeft: "12px", marginTop: "6px" }}
          >
            <Typography.Text style={{ fontSize: "14px" }}>
              {`Part ` + part.index}
            </Typography.Text>
          </Tag>
        ))}
      </div>
    </Col>
  );
}
