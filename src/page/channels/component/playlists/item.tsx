import { IPlaylist } from "@model";
import { Stack, Typography } from "@mui/material";
import { commonActions } from "@redux";
import { COLORS } from "@theme";
import { useDispatch } from "react-redux";

export function PlaylistItem({ data }: { data: IPlaylist }) {
  const dispatch = useDispatch();
  const { thumbnails, title } = data;
  return (
    <Stack
      direction={"row"}
      sx={{
        width: "225px",
        px: 0.8,
        py: 0.8,
        border: `1px solid ${COLORS.AzureishWhite}`,
        mx: 1.5,
        my: 1,
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(commonActions.selectPlaylist(data));
      }}
    >
      <img
        src={thumbnails.default.url}
        style={{ width: "60px", height: "60px", borderRadius: "4px" }}
      />
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
            {"A1-B1"}
          </Typography>
          <Typography style={{ fontSize: "12px", color: COLORS.DarkCharcoal }}>
            {`300 lessons`}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
