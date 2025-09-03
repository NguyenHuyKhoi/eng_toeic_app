import { useSelector } from "@common";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack, Typography } from "@mui/material";
import { COLORS } from "@theme";
import { Videos } from "./videos";
import { useDispatch } from "react-redux";
import { commonActions } from "@redux";
export function PlaylistDetail() {
  const dispatch = useDispatch();
  const { focus_playlist } = useSelector((x) => x.common);

  if (!focus_playlist) {
    return <div />;
  }
  return (
    <Stack sx={{ display: "flex", flex: 1 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{
          px: 1,
          pt: 3,
        }}
      >
        <ArrowBackIcon
          sx={{
            fontSize: "24px",
            color: COLORS.DarkCharcoal,
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch(commonActions.selectPlaylist(undefined));
          }}
        />
        <Typography
          style={{
            fontSize: "20px",
            color: COLORS.DarkCharcoal,
            marginLeft: "12px",
          }}
        >
          {focus_playlist.title}
        </Typography>
      </Stack>
      <Stack sx={{ display: "flex", flex: 1 }}>
        <Videos playlist={focus_playlist} />
      </Stack>
    </Stack>
  );
}
