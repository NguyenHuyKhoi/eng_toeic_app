import { IChannel, IPlaylist, IVideo } from "@model";
import CHANNELS from "./channels.json";
import PLAYLISTS from "./playlists.json";
import VIDEOS from "./videos.json";
import { paginate } from "@common";

export class DB {
  static channels() {
    return CHANNELS as unknown as IChannel[];
  }

  static playlists({ channel_id }: { channel_id: string }) {
    const result = (PLAYLISTS as unknown as IPlaylist[]).filter(
      (u) => u.channel === channel_id
    );

    result.sort((u, v) => (u.title < v.title ? -1 : 1));
    return result;
  }

  static videos({ playlist_id, page }: { playlist_id: string; page: number }) {
    const total_data = (VIDEOS as unknown as IVideo[]).filter(
      (u) => u.playlist === playlist_id
    );
    total_data.sort((u, v) => (u.duration < v.duration ? -1 : 1));

    return paginate(total_data, total_data.length, 15, page);
  }
}
