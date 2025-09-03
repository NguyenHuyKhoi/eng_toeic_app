/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityBase } from "./common";

export interface IChannel extends EntityBase {
  title: string;
  description: string;
  custom_url: string;
  published_at: Date;
  youtube_id: string;
  deleted_at: null;
  thumbnails?: any;
  sync_youtube_at: Date;
  exercise_count?: number;
  video_count: number;
}
