import { IExam } from "@model";
import { Button, Card, Row } from "antd";
import { useNavigate } from "react-router-dom";

export function ExamItem({ data }: { data: IExam }) {
  const navigate = useNavigate();
  const { source, year, index, id } = data;
  return (
    <Card
      title={`${source} ${year} - TEST ${(index + "").padStart(2, "0")}`}
      variant="outlined"
      style={{ width: 300, cursor: "pointer" }}
      onClick={() => {
        navigate(`/exam/${id}`);
      }}
    >
      <Button variant="outlined">Practice</Button>
    </Card>
  );
}
