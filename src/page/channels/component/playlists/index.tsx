import { DB } from "@data";
import { IChannel, IPlaylist } from "@model";
import { Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { PlaylistItem } from "./item";
import { COLORS } from "@theme";

export function Playlists({ channel }: { channel: IChannel }) {
  const [data, setData] = useState<IPlaylist[]>([]);
  const getData = useCallback(() => {
    const list = DB.playlists({ channel_id: channel.id });
    setData(list);
  }, [channel.id]);

  useEffect(() => {
    getData();
  }, [channel, getData]);

  return (
    <Stack sx={{ display: "flex", flex: 1, pt: 2 }}>
      <Typography
        sx={{
          fontSize: "24px",
          color: COLORS.DarkCharcoal,
          alignSelf: "center",
        }}
      >
        {channel.title}
      </Typography>
      <Stack direction={"row"} sx={{ alignItems: "center", flexWrap: "wrap" }}>
        {data.map((playlist) => (
          <PlaylistItem data={playlist} />
        ))}
      </Stack>
    </Stack>
  );
}
