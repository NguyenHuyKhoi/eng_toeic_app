import { useSelector } from "@common";
import { globalAlert } from "@component";
import { IExam, QUESTION_BEFORE_PART, TOEIC_PARTS } from "@model";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Button, Col, Row, Tag, Typography } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function DesktopPartNav({
  part_indexes,
  exam,
}: {
  part_indexes: number[];
  exam: IExam;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { part_index, user_answers } = useSelector((x) => x.practice);
  const partRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (part_index !== -1 && partRefs.current[part_index]) {
      partRefs.current[part_index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [part_index]);

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "12px",
        }}
      >
        <Typography.Title level={5} style={{ marginTop: "0px" }}>
          {`${exam.source} ${exam.year} - TEST ${(exam.index + "").padStart(
            2,
            "0"
          )}`}
        </Typography.Title>
        <Button
          variant="outlined"
          onClick={() => {
            globalAlert.show({
              title: "Confirm exit",
              onConfirm: () => navigate("/"),
            });
          }}
          size="small"
        >
          Exit
        </Button>
      </div>

      <div style={{ maxHeight: "75vh", overflowY: "scroll" }}>
        {display_parts.map((part) => (
          <Col
            style={{ paddingBottom: "20px" }}
            ref={(el) => {
              partRefs.current[part.index] = el;
            }}
            key={part.index}
          >
            <Typography.Title
              level={5}
              style={{ marginTop: "4px" }}
            >{`Part ${part.index}`}</Typography.Title>
            <Row style={{ flexWrap: "wrap" }}>
              {new Array(part.question_num ?? 0).fill(0).map((_, q_idx) => {
                const answered =
                  user_answers[part.question_before + q_idx + 1] != null;

                const question_index =
                  QUESTION_BEFORE_PART[part.index] + q_idx + 1;
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
                      dispatch(practiceActions.selectQuestion(question_index));
                    }}
                  >
                    <Typography.Text
                      style={{
                        color: answered ? COLORS.white : COLORS.DarkCharcoal,
                        fontSize: question_index > 100 ? "11px" : "12px",
                        fontWeight: "600",
                      }}
                    >
                      {question_index}
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
              dispatch(
                practiceActions.selectQuestion(
                  QUESTION_BEFORE_PART[part.index] + 1
                )
              );
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
