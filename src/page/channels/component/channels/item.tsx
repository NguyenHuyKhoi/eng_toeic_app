import { useSelector } from "@common";
import { IChannel } from "@model";
import { Stack, Typography } from "@mui/material";
import { commonActions } from "@redux";
import { COLORS } from "@theme";
import { useDispatch } from "react-redux";

export function ChannelItem({ data }: { data: IChannel }) {
  const dispatch = useDispatch();
  const { focus_channel } = useSelector((x) => x.common);
  const { title, thumbnails } = data;
  return (
    <Stack
      direction={"row"}
      sx={{
        px: 1,
        py: 0.8,
        borderRadius: "4px",
        border: `1px solid ${COLORS.AzureishWhite}`,
        backgroundColor:
          focus_channel?.id === data.id ? COLORS.AzureishWhite : undefined,
        cursor: "pointer",
      }}
      onClick={() => {
        console.log("Trigger press");
        if (focus_channel?.id !== data.id) {
          console.log("Come here");
          dispatch(commonActions.selectChannel(data));
        }
      }}
    >
      <img
        src={thumbnails?.medium?.url}
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "4px",
        }}
      />
      <Stack direction={"column"} sx={{ ml: "8px" }}>
        <Typography
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: COLORS.DarkCharcoal,
          }}
        >
          {title}
        </Typography>

        <Typography
          style={{
            fontSize: "14px",
            fontWeight: "400",
            color: COLORS.nickel,
          }}
        >
          {"600 lessons"}
        </Typography>
      </Stack>
    </Stack>
  );
}
