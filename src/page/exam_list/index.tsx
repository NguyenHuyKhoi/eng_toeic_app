import { DB } from "@data";
import { IExam } from "@model";
import { Col, Row, Tag, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { ExamItem } from "./component";
import { useSelector } from "@common";
import { useDispatch } from "react-redux";
import { practiceActions } from "@redux";

export function ExamListPage() {
  const dispatch = useDispatch();
  const { year } = useSelector((x) => x.practice);
  const [data, setData] = useState<IExam[]>([]);
  const getData = useCallback(() => {
    const list = DB.exams({ year });
    list.sort((u, v) => (u.index < v.index ? -1 : 1));
    setData(list);
  }, [year]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div
      style={{
        backgroundColor: "#F8F9FA",
        overflow: "auto",
        padding: "20px",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography.Title
        level={1}
        style={{
          marginTop: "10px",
          marginBottom: "12px",
        }}
      >
        {`TOEIC ETS`}
      </Typography.Title>
      <div style={{}}>
        {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year_item) => (
          <Tag
            onClick={() => {
              dispatch(practiceActions.selectYear(year_item));
            }}
            color={year === year_item ? "blue" : "default"}
            key={year_item}
            style={{ cursor: "pointer", marginLeft: "6px", marginTop: "6px" }}
          >
            <Typography.Text style={{ fontSize: "14px" }}>
              {year_item}
            </Typography.Text>
          </Tag>
        ))}
      </div>
      <Row gutter={[10, 20]} style={{ marginTop: "10px" }}>
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
