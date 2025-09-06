import { useSelector } from "@common";
import { IExam, QUESTION_BEFORE_PART, TOEIC_PARTS } from "@model";
import AppsIcon from "@mui/icons-material/Apps";
import { practiceActions } from "@redux";
import { COLORS } from "@theme";
import { Col, Row, Tag, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GridOffIcon from "@mui/icons-material/GridOff";
export function MobilePartNav({
  part_indexes,
  exam,
}: {
  part_indexes: number[];
  exam: IExam;
}) {
  const dispatch = useDispatch();
  const [grid_show, setGridShow] = useState<boolean>(false);
  const { part_index, user_answers } = useSelector((x) => x.practice);
  const partRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (part_index !== -1 && partRefs.current[part_index]) {
      partRefs.current[part_index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [part_index]);

  const display_parts = TOEIC_PARTS.filter((part) =>
    part_indexes.includes(part.index)
  );

  const current_part =
    part_index != -1
      ? display_parts.find((u) => u.index === part_index)
      : undefined;

  console.log("Grid show: ", grid_show, current_part);
  return (
    <Col
      style={{
        padding: "8px 4px",
        backgroundColor: COLORS.white,
        borderRadius: "6px",
      }}
    >
      {grid_show && current_part && (
        <Col
          style={{
            borderRadius: "4px",
            border: `1px solid ${COLORS.BrightGray}`,
            padding: "8px 6px",
            marginBottom: "4px",
          }}
        >
          <Row style={{ flexWrap: "wrap" }}>
            {new Array(current_part.question_num ?? 0)
              .fill(0)
              .map((_, q_idx) => {
                const answered =
                  user_answers[current_part.question_before + q_idx + 1] !=
                  null;

                const question_index =
                  QUESTION_BEFORE_PART[current_part.index] + q_idx + 1;
                return (
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
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
                      dispatch(practiceActions.selectQuestion(question_index));
                    }}
                  >
                    <Typography.Text
                      style={{
                        color: answered ? COLORS.white : COLORS.DarkCharcoal,
                        fontSize: question_index > 100 ? "12px" : "14px",
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
      )}

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflowY: "scroll",
            flex: 1,
            borderRadius: "4px",
            border: `1px solid ${COLORS.nickel}`,
            padding: "6px 2px 8px 2px",
            marginRight: "8px",
          }}
          className="hidden-scrollbar"
        >
          <style>
            {`
              .hidden-scrollbar {
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              .hidden-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {display_parts.map((part) => (
            <div
              ref={(el) => {
                partRefs.current[part.index] = el;
              }}
            >
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
                style={{ cursor: "pointer", marginLeft: "2px" }}
              >
                <Typography.Text style={{ fontSize: "14px" }}>
                  {`Part ` + part.index}
                </Typography.Text>
              </Tag>
            </div>
          ))}
        </div>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "4px",
            border: `1px solid ${COLORS.nickel}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {grid_show ? (
            <GridOffIcon
              sx={{ fontSize: "24px", color: COLORS.nickel }}
              onClick={() => {
                setGridShow(false);
              }}
            />
          ) : (
            <AppsIcon
              sx={{ fontSize: "24px", color: COLORS.nickel }}
              onClick={() => {
                setGridShow(true);
              }}
            />
          )}
        </div>
      </div>
    </Col>
  );
}
