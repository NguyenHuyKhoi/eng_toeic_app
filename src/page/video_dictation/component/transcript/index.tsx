/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useSelector, useUI } from "@common";
import { Box, Stack, Typography } from "@mui/material";
import { COLORS } from "@theme";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { SentenceItem } from "./sentence";

export function VideoTranscript() {
  const dispatch = useDispatch();

  const { video, focus_sentence_index } = useSelector((x) => x.video_play);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (focus_sentence_index == undefined) {
      return;
    }
    const el = sentenceRefs.current[focus_sentence_index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [focus_sentence_index]);

  const { window_height } = useUI();
  if (!video) {
    return;
  }
  const transcript = video.transcript;
  return (
    <Stack direction={"column"}>
      <Stack sx={{ paddingRight: "12px" }}>
        {transcript.length == 0 ? (
          <Typography
            style={{ fontSize: 16, fontWeight: 400, color: COLORS.nickel }}
          >
            no transcript
          </Typography>
        ) : (
          <Stack
            sx={{
              height: Math.min(500, window_height * 0.6),
              overflowY: "scroll",
              borderRadius: "4px",
              border: `1px solid ${COLORS.nickel}`,
              // padding: "2px 2px",
            }}
          >
            <Stack direction={"column"}>
              {transcript.map((sentence, s_i) => (
                <Box
                  ref={(el: any) => (sentenceRefs.current[s_i] = el)}
                  key={s_i}
                >
                  <SentenceItem data={sentence} index={s_i} />
                </Box>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
