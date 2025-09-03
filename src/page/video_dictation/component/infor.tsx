import { IVideo } from "@model";
import { Box, Stack, Typography } from "@mui/material";
import { COLORS } from "@theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { commonActions } from "@redux";
export function VideoInfo({ data }: { data: IVideo }) {
  const dispatch = useDispatch();
  const { title } = data;
  return (
    <Stack
      direction={"row"}
      sx={{
        py: 1.5,
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <Box>
        <ArrowBackIcon
          sx={{
            fontSize: "24px",
            color: COLORS.DarkCharcoal,
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(commonActions.selectVideo(undefined));
          }}
        />
      </Box>
      <Typography
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: COLORS.DarkCharcoal,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ width: "30px" }} />
    </Stack>
  );
}
