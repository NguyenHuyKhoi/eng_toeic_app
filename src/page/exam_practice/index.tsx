import { Typography } from "antd";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useExam } from "../exam_detail/hook";
import { PartNav, PartWrapper } from "./component";
import { useDispatch } from "react-redux";
import { practiceActions } from "@redux";

export function ExamPracticePage() {
  const dispatch = useDispatch();
  const { exam_id } = useParams();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const part_indexes = useMemo(() => {
    const part_params = queryParams.get("parts") ?? "";
    console.log("part_params: ", part_params);
    return part_params
      .split(",")
      .map((u) => parseInt(u))
      .filter((u) => !isNaN(u));
  }, [queryParams]);
  console.log("part: ", part_indexes);
  const { exam, parts } = useExam({ exam_id, part_indexes });

  useEffect(() => {
    dispatch(practiceActions.selectExam(exam));
  }, [dispatch, exam]);

  if (exam == null) {
    return <div />;
  }
  console.log("Parts: ", parts);
  const { source, year, index } = exam;
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px 20px",
        width: "100vw",
        backgroundColor: "#F8F9FA",
      }}
    >
      <Typography.Title level={2} style={{ marginTop: "0px" }}>
        {`${source} ${year} - TEST ${(index + "").padStart(2, "0")}`}
      </Typography.Title>

      <div style={{ display: "flex" }}>
        <PartNav part_indexes={part_indexes} />

        <PartWrapper parts={parts} />
      </div>
    </div>
  );
}
