import { DB } from "@data";
import { IExam } from "@model";
import { Col, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import { ExamItem } from "./component";

export function ExamListPage() {
  const [data, setData] = useState<IExam[]>([]);
  const getData = useCallback(() => {
    const list = DB.exams();
    setData(list);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <Row gutter={[10, 10]}>
        {data.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={6}>
            <ExamItem data={item} />
          </Col>
        ))}
      </Row>{" "}
      <div></div>
    </div>
  );
}
