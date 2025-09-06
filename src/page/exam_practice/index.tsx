import { bottomPadding, isChromeAndroid, useExam, useUI } from "@common";
import { QUESTION_BEFORE_PART } from "@model";
import { practiceActions } from "@redux";
import { BG_COLOR } from "@theme";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { MobilePartNav } from "./component/part_nav/mobile";
import { DesktopPartNav, PartWrapper } from "./component";
import { Typography } from "@mui/material";

export function ExamPracticePage() {
  const dispatch = useDispatch();
  const { is_mobile, viewport_height, viewport_width } = useUI();

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
  console.log("Examm: ", exam, is_mobile);

  return (
    <div
      style={{
        padding: is_mobile ? "10px 8px" : "20px 20px",
        width: viewport_width,
        backgroundColor: BG_COLOR,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flex: 1 }}>
        {!is_mobile && (
          <DesktopPartNav part_indexes={part_indexes} exam={exam} />
        )}

        <PartWrapper parts={parts} />
      </div>
      {is_mobile && (
        <div
          style={{
            position: "absolute",
            left: "0px",
            right: "0px",
            bottom: "0px",
          }}
        >
          <MobilePartNav part_indexes={part_indexes} exam={exam} />
        </div>
      )}
    </div>
  );
}
