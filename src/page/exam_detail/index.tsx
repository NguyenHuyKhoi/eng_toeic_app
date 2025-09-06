import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PartSelect } from "./component";
import { Button, Col, Row, Typography } from "antd";
import { showToast } from "@component";
import { BG_COLOR, COLORS } from "@theme";
import { useExam, useUI } from "@common";

export function ExamDetailPage() {
  const navigate = useNavigate();
  const { exam_id } = useParams();
  const [parts, setParts] = useState<number[]>([]);
  console.log("Exam_id", exam_id);

  const { exam } = useExam({ exam_id });
  console.log("Exam: ", exam);

  const { is_mobile } = useUI();
  if (exam == null) {
    return <div>No exam data</div>;
  }
  const { source, year, index, id } = exam;
  return (
    <Row
      style={{
        height: "100vh",
        width: "100vw",
        padding: is_mobile ? "12px 10px" : "20px 20px",
        backgroundColor: BG_COLOR,
      }}
      align="top"
    >
      <Col
        span={24}
        style={{
          backgroundColor: "#fff",
          padding: is_mobile ? "10px 6px" : "12px 10px",
          borderRadius: "6px",
          border: `1px solid ${COLORS.SpanishGray}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: `1px solid ${COLORS.BrightGray}`,
            padding: "4px 0px",
          }}
        >
          <Button
            type="default"
            onClick={() => {
              navigate(-1);
            }}
            variant="outlined"
            size="small"
            style={{}}
          >
            Back
          </Button>
          <Typography.Title level={is_mobile ? 4 : 3} style={{ marginTop: 0 }}>
            {`${source} ${year} - TEST ${(index + "").padStart(2, "0")}`}
          </Typography.Title>
          <div style={{ width: "60px", height: "10px" }} />
        </div>
        <div
          style={{
            paddingTop: "12px",
            ...(is_mobile ? {} : { alignSelf: "center" }),
          }}
        >
          <PartSelect selected_list={parts} onSelect={setParts} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            type="primary"
            size={is_mobile ? "middle" : "large"}
            onClick={() => {
              if (parts.length === 0) {
                showToast({ content: "No part is selected", type: "warning" });
                return;
              }
              navigate(`/exam_practice/${id}?parts=${parts.join(",")}`);
            }}
            style={{}}
          >
            Practice
          </Button>
        </div>
      </Col>
    </Row>
  );
}
