import { useSelector } from "@common";
import { Grid, Stack } from "@mui/material";
import { ChannelDetail, Channels } from "./component";

export function ChannelPage() {
  const { focus_channel } = useSelector((x) => x.common);

  return (
    <Stack sx={{ display: "flex", flex: 1 }}>
      <Grid container sx={{ display: "flex", flex: 1 }}>
        <Grid item xs={3}>
          <Channels />
        </Grid>
        <Grid item xs={9} sx={{}}>
          {focus_channel ? <ChannelDetail /> : <div />}
        </Grid>
      </Grid>
    </Stack>
  );
}
