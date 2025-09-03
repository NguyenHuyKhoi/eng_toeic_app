/* eslint-disable no-empty-pattern */
import { useUI } from "@common";
import { Stack, Typography } from "@mui/material";
import { COLORS } from "@theme";

export function HomePage() {
  const {} = useUI();
  return (
    <Stack sx={{ width: "100vw", height: "100vh", backgroundColor: "#fff" }}>
      <Typography style={{ fontSize: "100px", color: COLORS.DarkCharcoal }}>
        TOEIC PAGE
      </Typography>
    </Stack>
  );
}
