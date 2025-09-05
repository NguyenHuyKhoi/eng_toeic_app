import { Button, Typography } from "antd";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExam } from "../exam_detail/hook";
import { PartNav, PartWrapper } from "./component";
import { useDispatch } from "react-redux";
import { practiceActions } from "@redux";
import { useSelector } from "@common";
import { QUESTION_BEFORE_PART } from "@model";
import { globalAlert } from "@component";

export function ExamPracticePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { part_index } = useSelector((x) => x.practice);
  const { exam_id } = useParams();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const part_indexes = useMemo(() => {
    const part_params = queryParams.get("parts") ?? "";
    return part_params
      .split(",")
      .map((u) => parseInt(u))
      .filter((u) => !isNaN(u));
  }, [queryParams]);

  const { exam, parts } = useExam({ exam_id, part_indexes });

  useEffect(() => {
    dispatch(practiceActions.selectExam(exam));
  }, [dispatch, exam]);

  useEffect(() => {
    if (!exam_id || part_indexes.length == 0) {
      return;
    }
    dispatch(practiceActions.selectPart(part_indexes[0]));
    dispatch(
      practiceActions.selectQuestion(QUESTION_BEFORE_PART[part_indexes[0]] + 1)
    );
  }, [dispatch, exam_id, part_indexes]);

  if (exam == null) {
    return <div />;
  }
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title level={2} style={{ marginTop: "0px" }}>
          {`${source} ${year} - TEST ${(index + "").padStart(2, "0")}`}
        </Typography.Title>
        <Button
          variant="outlined"
          onClick={() => {
            globalAlert.show({
              title: "Confirm exit",
              onConfirm: () => navigate("/"),
            });
          }}
        >
          Exit
        </Button>
      </div>

      <div style={{ display: "flex" }}>
        <PartNav part_indexes={part_indexes} />

        <PartWrapper parts={parts} />
      </div>
    </div>
  );
}
