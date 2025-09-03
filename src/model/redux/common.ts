import type { IChannel } from "../channel";
import { IPlaylist } from "../playlist";
import { IVideo, IVideoLevel } from "../video";

export interface CommonReduxState {
  focus_channel?: IChannel;
  focus_playlist?: IPlaylist;
  focus_video?: IVideo;

  video_filter: IVideoFilter;
}

export interface IVideoFilter {
  level?: IVideoLevel;
}
