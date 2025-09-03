/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityBase } from "./common";
export interface IPlaylist extends EntityBase {
  title: string;
  description: string;
  youtube_id: string;
  thumbnails: any;
  channel: string;
}
