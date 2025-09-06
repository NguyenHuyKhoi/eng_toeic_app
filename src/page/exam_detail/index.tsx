import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PartSelect } from "./component";
import { Button, Col, Row, Typography } from "antd";
import { showToast } from "@component";
import { BG_COLOR, COLORS } from "@theme";
import { useExam } from "@common";

export function ExamDetailPage() {
  const navigate = useNavigate();
  const { exam_id } = useParams();
  const [parts, setParts] = useState<number[]>([]);
  console.log("Exam_id", exam_id);

  const { exam } = useExam({ exam_id });
  console.log("Exam: ", exam);

  if (exam == null) {
    return <div>No exam data</div>;
  }
  const { source, year, index, id } = exam;
  return (
    <Row
      style={{
        height: "100vh",
        width: "100vw",
        padding: "20px 20px",
        backgroundColor: BG_COLOR,
      }}
      align="top"
    >
      <Col
        span={24}
        style={{
          backgroundColor: "#fff",
          padding: "12px 20px",
          borderRadius: "6px",
          border: `1px solid ${COLORS.SpanishGray}`,
        }}
      >
        <Typography.Title level={1} style={{ marginTop: "0px" }}>
          {`${source} ${year} - TEST ${(index + "").padStart(2, "0")}`}
        </Typography.Title>
        <PartSelect selected_list={parts} onSelect={setParts} />
        <Button
          type="primary"
          onClick={() => {
            if (parts.length === 0) {
              showToast({ content: "No part is selected", type: "warning" });
              return;
            }
            navigate(`/exam_practice/${id}?parts=${parts.join(",")}`);
          }}
          style={{ marginTop: "12px" }}
        >
          Practice
        </Button>
      </Col>
    </Row>
  );
}
