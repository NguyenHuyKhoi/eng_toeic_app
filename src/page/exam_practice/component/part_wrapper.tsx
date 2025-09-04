import { useSelector } from "@common";
import { IExamPart } from "@model";
import { useCallback } from "react";
import { Part1 } from "./part1";
import { Part2 } from "./part2";
import { Part3_4 } from "./part3_4";
import { Part5 } from "./part5";
import { Part6_7 } from "./part6_7";

export function PartWrapper({ parts }: { parts: IExamPart[] }) {
  const { part_index, user_answers } = useSelector((x) => x.practice);

  const part = parts.find((u) => u.index === part_index);
  const renderPart = useCallback(
    (part: IExamPart) => {
      switch (part_index) {
        case 1:
          return <Part1 data={part} />;
        case 2:
          return <Part2 data={part} />;
        case 3:
        case 4:
          return <Part3_4 data={part} />;
        case 5:
          return <Part5 data={part} />;
        case 6:
        case 7:
          return <Part6_7 data={part} />;
        default:
          return <div />;
      }
    },
    [part_index, user_answers]
  );
  if (!part) {
    return <div />;
  }
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        marginLeft: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "80vh",
          overflowY: "scroll",
          backgroundColor: "#fff",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {renderPart(part)}
      </div>
    </div>
  );
}
