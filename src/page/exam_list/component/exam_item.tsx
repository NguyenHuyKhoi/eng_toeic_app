import { useUI } from "@common";
import { IExam } from "@model";
import { COLORS } from "@theme";
import { Button, Card, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export function ExamItem({ data }: { data: IExam }) {
  const navigate = useNavigate();
  const { source, year, index, id } = data;
  const { is_mobile } = useUI();
  return (
    <div
      onClick={() => {
        navigate(`/exam/${id}`);
      }}
      style={{
        borderRadius: "3px",
        border: `2px solid ${COLORS.BrightGray}`,
        backgroundColor: "#fff",
        padding: is_mobile ? "4px 10px" : "12px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography.Text
          style={{
            fontSize: "17px",
            fontWeight: "600",
            color: COLORS.black,
            marginTop: 0,
          }}
        >
          {`TEST ${(index + "").padStart(2, "0")}`}
        </Typography.Text>
        <div style={{ display: "" }}>
          <Typography.Text
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: COLORS.nickel,
              marginTop: 0,
            }}
          >
            {`7 parts`}
          </Typography.Text>
          <Typography.Text
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: COLORS.nickel,
              marginTop: 0,
              marginLeft: is_mobile ? "60px" : "30px",
            }}
          >
            {`200 questions`}
          </Typography.Text>
        </div>
      </div>
      <Button variant="outlined">Practice</Button>
    </div>
  );
}
