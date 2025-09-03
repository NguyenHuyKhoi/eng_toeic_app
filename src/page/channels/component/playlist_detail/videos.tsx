import { DB } from "@data";
import { IList, IPagination, IPlaylist, IVideo } from "@model";
import { Pagination, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { VideoItem } from "./video";
import { COLORS } from "@theme";

export function Videos({ playlist }: { playlist: IPlaylist }) {
  const [pagination, setPagination] = useState<IPagination | undefined>();
  const [data, setData] = useState<IVideo[]>([]);
  const [page, setPage] = useState<number>(1);

  const getData = useCallback(() => {
    const result: IList<IVideo> = DB.videos({
      playlist_id: playlist.id,
      page,
    });
    console.log("Result: ", result.data.length, result.pagination);
    setData(result.data);
    setPagination(result.pagination);
  }, [playlist.id, page]);

  useEffect(() => {
    getData();
  }, [playlist, getData]);

  return (
    <Stack style={{ display: "flex", flex: 1 }}>
      <Stack
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {data.map((item) => (
            <VideoItem data={item} />
          ))}
        </Stack>
      </Stack>
      {pagination && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ mt: 2 }}
        >
          <div />
          <Pagination
            onChange={(_, new_page) => setPage(new_page)}
            page={page}
            count={pagination.last_page}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: COLORS.nickel,
                color: "white",
              },
              "& .MuiPaginationItem-root.Mui-selected:hover": {
                backgroundColor: COLORS.nickel,
              },
            }}
          />
          <div />
        </Stack>
      )}
    </Stack>
  );
}
