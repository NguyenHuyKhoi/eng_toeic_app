import { images } from "@asset";
import { CKEditor, HtmlReact } from "@component";
import { IQuestion } from "@model";
import { Stack } from "@mui/material";
import { COLORS } from "@theme";
import { Button, Typography } from "antd";
import axios from "axios";
import { useCallback, useState } from "react";
export function QuestionItem({ data }: { data: IQuestion }) {
  const [contents, setContents] = useState<string[]>(
    new Array(data.image_urls.length).fill("")
  );

  const readImage = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:3000/api/questions/${data.id}/read_image`
    );
    console.log("Res: ", res.data.data);
    setContents(res.data.data);
  }, [data.id]);

  return (
    <div
      style={{
        border: `2px solid ${COLORS.BrightGray}`,
        borderRadius: "4px",
        padding: "12px 10px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: COLORS.DarkCharcoal,
            textAlign: "center",
          }}
        >{`Question ${data.code}`}</Typography>
        <Button
          variant="outlined"
          style={{ alignSelf: "center", margin: "0px 12px" }}
          onClick={readImage}
        >
          Read image
        </Button>
      </div>

      {data.image_urls.map((img, img_idx) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "20px 0px",
            borderBottom: `2px solid ${COLORS.nickel}`,
          }}
        >
          <img
            onError={(e) => {
              if (e.currentTarget.src !== images.error_image) {
                e.currentTarget.src = images.error_image;
              }
            }}
            onClick={() => {
              window.open(img);
            }}
            src={img}
            style={{
              maxWidth: "400px",
              maxHeight: "400px",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              border: `1px solid ${COLORS.BrightGray}`,
              borderRadius: "4px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          />
          <Stack direction={"row"} sx={{}}>
            <Stack direction={"column"} style={{ display: "flex", flex: 1 }}>
              <CKEditor
                data={contents[img_idx]}
                onChange={(a: string) => {
                  setContents((arr) => {
                    const new_arr = [...arr];
                    new_arr[img_idx] = a;
                    return new_arr;
                  });
                }}
              />
            </Stack>

            <Stack
              direction={"column"}
              sx={{
                ml: 2,
                py: 1,
                px: 1.5,
                borderRadius: "4px",
                border: "1px solid #999",
                height: "400px",
                overflowY: "auto",
                display: "flex",
                flex: 1,
              }}
              spacing={1}
            >
              <HtmlReact data={contents[img_idx]} />
            </Stack>
          </Stack>
        </div>
      ))}
    </div>
  );
}
