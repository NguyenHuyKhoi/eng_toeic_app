/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { cleanWord, useSelector } from "@common";
import { Stack, Typography } from "@mui/material";
import { dictationActions } from "@redux";
import { COLORS } from "@theme";
import { useDispatch } from "react-redux";
export function WordItem({ word }: { word: string }) {
  const { focus_word } = useSelector((x) => x.dictation);
  const is_focused = focus_word == cleanWord(word);
  const dispatch = useDispatch();

  return (
    <Stack
      onClick={(e) => {
        dispatch(
          dictationActions.focusWord(is_focused ? undefined : cleanWord(word))
        );
        e.stopPropagation();
      }}
      sx={{
        backgroundColor: is_focused ? "#0857A0BB" : undefined,
        px: is_focused ? 0.4 : 0,
        borderRadius: is_focused ? 0.6 : 0,
      }}
    >
      <Typography
        style={{
          fontSize: 15,
          fontWeight: is_focused ? "400" : "400",
          lineHeight: "16px",
          color: is_focused ? COLORS.white : COLORS.DarkCharcoal,
        }}
      >
        {word}
      </Typography>
    </Stack>
  );
}
