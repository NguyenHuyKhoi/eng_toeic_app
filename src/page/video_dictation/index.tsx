import { useSelector } from "@common";
import { Box, Stack } from "@mui/material";
import { dictationActions, videoPlayActions } from "@redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { VideoInfo } from "./component/infor";
import { VideoPlayer } from "./component/player";
import { Dictation, VideoTranscript } from "./component";

export function VideoDictation() {
  const dispatch = useDispatch();
  const { focus_video } = useSelector((x) => x.common);

  const { video: dictation_video } = useSelector((x) => x.dictation);
  useEffect(() => {
    console.log("Set up video: ", focus_video);
    dispatch(videoPlayActions.setVideo(focus_video));
    dispatch(dictationActions.selectVideo(focus_video));
  }, [dispatch, focus_video]);

  return (
    <Stack>
      <VideoInfo data={focus_video} />
      <Stack direction={"row"}>
        <Box sx={{ display: "flex", flex: 1 }}>
          <VideoPlayer data={focus_video} />
        </Box>
        <Box sx={{ display: "flex", flex: 1 }}>
          <VideoTranscript />
        </Box>
      </Stack>
      {dictation_video && <Dictation />}
    </Stack>
  );
}
