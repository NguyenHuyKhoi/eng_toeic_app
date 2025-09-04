import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExam } from "./hook";
import { PartSelect } from "./component";
import { Button, Col, Row, Typography } from "antd";
import { showToast } from "@component";

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
    <Row style={{ minHeight: "100vh", padding: "10px" }} align="top">
      <Col span={24}>
        <Typography.Title level={3}>
          {`${source} ${year} - TEST ${(index + "").padStart(2, "0")}`}
        </Typography.Title>
        <PartSelect selected_list={parts} onSelect={setParts} />
        <Button
          type="primary"
          onClick={() => {
            if (parts.length === 0) {
              showToast({ content: "Chưa chọn phần nào", type: "warning" });
              return;
            }
            navigate(`/exam_practice/${id}?parts=${parts.join(",")}`);
          }}
          style={{ marginTop: "12px" }}
        >
          Luyện tập
        </Button>
      </Col>
    </Row>
  );
}
