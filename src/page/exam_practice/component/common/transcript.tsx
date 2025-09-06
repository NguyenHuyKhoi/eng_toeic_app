/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { formatDuration, useUI } from "@common";
import { IQuestion } from "@model";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { COLORS } from "@theme";
import { useCallback, useEffect, useRef } from "react";

export function TranscriptList({
  data,
  focus_time,
}: {
  data: IQuestion;
  focus_time?: number;
}) {
  const transcript = data.audio_transcribe ?? [];

  const { is_mobile } = useUI();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getFocusSentence = useCallback(() => {
    for (let i = 0; i < transcript.length; i++) {
      const sentence = transcript[i];
      if (
        focus_time != null &&
        sentence.start <= focus_time &&
        focus_time <= sentence.end
      ) {
        return i;
      }
    }
    return -1;
  }, [transcript, focus_time]);

  const sentence_idx = getFocusSentence();

  useEffect(() => {
    if (sentence_idx !== -1 && sentenceRefs.current[sentence_idx]) {
      sentenceRefs.current[sentence_idx]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [sentence_idx]);

  return (
    <Stack sx={{ display: "flex" }}>
      <Stack
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowY: "scroll",
          maxHeight: "400px",
        }}
        spacing={is_mobile ? 0.8 : 1.2}
      >
        {transcript.map((sentence, s_i) => {
          const is_sentence_focused = sentence_idx === s_i;

          return (
            <div
              key={s_i + ""}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
              ref={(el) => {
                sentenceRefs.current[s_i] = el;
              }}
            >
              <Tooltip title="Play this sentence" placement="left">
                <Box sx={{ cursor: "pointer" }} onClick={() => {}}>
                  <Typography
                    style={{
                      fontSize: is_mobile ? "12px" : "12px",
                      fontWeight: is_sentence_focused ? 600 : 400,
                      color: is_sentence_focused
                        ? COLORS.CelticBlue
                        : COLORS.nickel,
                      marginTop: "2px",
                    }}
                  >
                    {formatDuration(sentence.start)}
                  </Typography>
                </Box>
              </Tooltip>
              <Typography
                style={{
                  fontSize: is_mobile ? "14px" : "15px",
                  color: is_sentence_focused
                    ? COLORS.CelticBlue
                    : COLORS.DarkCharcoal,
                  marginLeft: "14px",
                }}
              >
                {sentence.text}
              </Typography>
            </div>
          );
        })}
      </Stack>
    </Stack>
  );
}
