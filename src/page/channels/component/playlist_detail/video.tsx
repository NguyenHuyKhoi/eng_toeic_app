import { formatDuration } from "@common";
import { IVideo } from "@model";
import { Box, Stack, Typography } from "@mui/material";
import { commonActions } from "@redux";
import { COLORS } from "@theme";
import { useDispatch } from "react-redux";

export function VideoItem({ data }: { data: IVideo }) {
  const dispatch = useDispatch();
  const { duration, transcript, title } = data;
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "230px",
        px: 0.8,
        py: 0.8,
        border: `1px solid ${COLORS.nickel}`,
        mx: 0.8,
        my: 1,
        cursor: "pointer",
        borderRadius: "3px",
      }}
      onClick={() => {
        console.log("Select video: ", data);
        dispatch(commonActions.selectVideo(data));
      }}
    >
      <Box sx={{ position: "relative", width: "60px", height: "60px" }}>
        <img
          src={data.thumbnail}
          style={{
            width: "60px",
            height: "60px",
            aspectRatio: 1,
            borderRadius: "3px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: "2px",
            bottom: "2px",
            backgroundColor: "#ffffffAA",
            borderRadius: "3px",
            padding: "0px 4px",
          }}
        >
          <Typography
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: COLORS.black,
            }}
          >
            {`${formatDuration(duration)}`}
          </Typography>
        </Box>
      </Box>
      <Stack direction={"column"} sx={{ ml: "6px", display: "flex", flex: 1 }}>
        <Typography
          style={{
            fontSize: "13px",
            color: COLORS.DarkCharcoal,
            fontWeight: "600",
            lineHeight: "16px",
            flexWrap: "wrap",
            display: "flex",
            flex: 1,
          }}
        >
          {title}
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography style={{ fontSize: "12px", color: COLORS.DarkCharcoal }}>
            {`${transcript.length} parts`}
          </Typography>
          <Typography style={{ fontSize: "12px", color: COLORS.DarkCharcoal }}>
            {`B1`}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
