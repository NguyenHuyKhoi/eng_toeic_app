import { images } from "@asset";
import { CKEditor } from "@component";
import { IQuestion } from "@model";
import { Stack } from "@mui/material";
import { COLORS } from "@theme";
import { Button, Tabs, Typography } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { QuestionItem } from "./component/question";

export type QuestionCategory =
  | "no_image"
  | "no_content"
  | "raw_content"
  | "edited_content";

export function QuestionList({ category }: { category: QuestionCategory }) {
  const [data, setData] = useState<IQuestion[]>([]);

  const getData = useCallback(async () => {
    const a1 = await axios.get(`http://localhost:3000/api/questions`, {
      params: {
        category,
        per_page: 5,
        part: 7,
      },
    });

    setData(a1.data.data.data as IQuestion[]);
  }, [category]);

  useEffect(() => {
    getData();
  }, [getData]);

  console.log("data:", data);
  return (
    <div
      style={{
        height: "80vh",
        overflowY: "scroll",
      }}
    >
      {data.map((question) => {
        console.log("Question : ", question);
        return <QuestionItem data={question} />;
      })}
    </div>
  );
}
export function CheckPage() {
  const [category, setCategory] = useState<QuestionCategory>("no_content");
  return (
    <div style={{ width: "100vw", height: "100vh", padding: "10px 20px" }}>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Tabs
          style={{ marginLeft: "100px" }}
          items={[
            {
              label: "No content",
              key: "no_content",
            },
            {
              label: "Raw content",
              key: "raw_content",
            },
            {
              label: "edited content",
              key: "edited_content",
            },
          ]}
          onChange={(tab) => setCategory(tab as QuestionCategory)}
        />
      </div>
      <QuestionList category={category} />
    </div>
  );
}
