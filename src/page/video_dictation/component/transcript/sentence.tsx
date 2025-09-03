/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { formatDuration, useSelector } from "@common";
import { SentenceEntity } from "@model";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { videoPlayActions } from "@redux";
import { COLORS } from "@theme";
import { useDispatch } from "react-redux";
import { WordItem } from "./word";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
export function SentenceItem({
  data,
  index,
}: {
  data: SentenceEntity;
  index: number;
}) {
  const dispatch = useDispatch();
  const { focus_sentence_index, playing } = useSelector((x) => x.video_play);
  const is_focused = focus_sentence_index == index;

  const sentence_playing = playing && focus_sentence_index === index;
  return (
    <Tooltip
      title={`Play this sentence at ${formatDuration(data.start)}`}
      placement="left"
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        onClick={() => {}}
        sx={{
          px: 1.2,
          py: 0.8,
          cursor: "pointer",
          backgroundColor: is_focused ? `${COLORS.CelticBlue}22` : "#fff",
          borderTop: index === 0 ? undefined : `1px solid ${COLORS.BrightGray}`,
        }}
      >
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => {
            if (sentence_playing) {
              dispatch(videoPlayActions.setPlaying(false));

              return;
            }
            dispatch(videoPlayActions.playSentence({ sentence: data, index }));
          }}
        >
          {sentence_playing ? (
            <PauseCircleOutlineOutlinedIcon
              sx={{
                fontSize: "26px",
                color: COLORS.CelticBlue,
              }}
            />
          ) : (
            <PlayCircleFilledWhiteOutlinedIcon
              sx={{
                fontSize: "26px",
                color: COLORS.nickel,
              }}
            />
          )}
        </Box>

        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          sx={{
            flexWrap: "wrap",
            display: "flex",
            flex: 1,
          }}
        >
          {data.text
            .replace(/\s*([?!.,\n])\s*/g, "$1 ")
            .split(" ")
            .map((word, w_i) => (
              <Box style={{ marginBottom: "6px" }}>
                <WordItem word={word} key={w_i} />
              </Box>
            ))}
        </Stack>
      </Stack>
    </Tooltip>
  );
}
