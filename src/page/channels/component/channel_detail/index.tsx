import { useSelector } from "@common";
import { Stack } from "@mui/material";
import { Playlists } from "../playlists";
import { PlaylistDetail } from "../playlist_detail";

export function ChannelDetail() {
  const { focus_channel, focus_playlist } = useSelector((x) => x.common);

  return (
    <Stack
      sx={{
        display: "flex",
        flex: 1,
        height: "100%",
      }}
    >
      <Stack sx={{ display: "flex", flex: 1 }}>
        {focus_playlist ? (
          <PlaylistDetail />
        ) : (
          <Playlists channel={focus_channel} />
        )}
      </Stack>
    </Stack>
  );
}
