import { DB } from "@data";
import { IChannel } from "@model";
import { Stack } from "@mui/material";
import { ChannelItem } from "./item";
import { useDispatch } from "react-redux";
import { commonActions } from "@redux";
import { useCallback, useEffect, useState } from "react";
export function Channels() {
  const dispatch = useDispatch();

  const [data, setData] = useState<IChannel[]>([]);

  const first_channel = data.length > 0 ? data[0] : undefined;

  const getData = useCallback(() => {
    const list: IChannel[] = DB.channels();
    setData(list);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    dispatch(commonActions.selectChannel(first_channel));
  }, [dispatch, first_channel]);

  return (
    <Stack
      sx={{
        display: "flex",
        flex: 1,
        backgroundColor: "#F9FBFC",
        px: 1.5,
        py: 1.5,
      }}
    >
      <Stack
        direction={"column"}
        style={{ height: "600px", overflowY: "auto" }}
        spacing={2}
      >
        {data.map((channel) => (
          <ChannelItem key={channel.id} data={channel} />
        ))}
      </Stack>
    </Stack>
  );
}
