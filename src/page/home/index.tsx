/* eslint-disable no-empty-pattern */
import { Stack } from "@mui/material";
import { ChannelPage } from "../channels";
import { useSelector, useUI } from "@common";
import { VideoDictation } from "../video_dictation";

export function HomePage() {
  const { focus_video } = useSelector((x) => x.common);
  const {} = useUI();
  return (
    <Stack sx={{ width: "100vw", height: "100vh", backgroundColor: "#fff" }}>
      {focus_video ? <VideoDictation /> : <ChannelPage />}
    </Stack>
  );
}
