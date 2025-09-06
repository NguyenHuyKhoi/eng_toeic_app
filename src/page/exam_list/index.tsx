import { useSelector, useUI } from "@common";
import { IExam } from "@model";
import { practiceActions } from "@redux";
import { Api } from "@service";
import { Col, Row, Tag, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ExamItem } from "./component";
import { BG_COLOR } from "@theme";

export function ExamListPage() {
  const dispatch = useDispatch();
  const { year } = useSelector((x) => x.practice);
  const [data, setData] = useState<IExam[]>([]);
  const getData = useCallback(async () => {
    const res = await Api.exam.index({ year });

    const list = res.data;
    list.sort((u, v) => (u.index < v.index ? -1 : 1));
    setData(list);
  }, [year]);

  useEffect(() => {
    getData();
  }, [getData]);

  const { is_mobile } = useUI();
  return (
    <div
      style={{
        backgroundColor: BG_COLOR,
        overflow: "auto",
        padding: is_mobile ? "12px 10px 10px 10px" : "12px 16px 16px 30px",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Typography.Title
        level={is_mobile ? 3 : 2}
        style={{
          marginTop: is_mobile ? 0 : "10px",
          marginBottom: is_mobile ? "4px" : "4px",
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
            <Typography.Text style={{ fontSize: "16px" }}>
              {year_item}
            </Typography.Text>
          </Tag>
        ))}
      </div>
      <Row style={{ marginTop: "10px" }}>
        {data.map((item) => (
          <Col
            key={item.id}
            xs={24}
            sm={12}
            md={6}
            style={{
              paddingRight: is_mobile ? 0 : "16px",
              paddingBottom: is_mobile ? "10px" : "20px",
            }}
          >
            <ExamItem data={item} />
          </Col>
        ))}
      </Row>{" "}
      <div></div>
    </div>
  );
}
