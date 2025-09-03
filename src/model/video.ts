import { EntityBase } from "./common";
export type IVideoLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export const REWRITE_SPLITER = "---";
export interface IVideo extends EntityBase {
  title: string;
  description: string;
  channel: string;
  channel_youtube_id: string;
  playlist: string;
  playlist_youtube_id: string;
  duration: number;
  published_at: Date;
  level?: IVideoLevel;
  tags: string[];
  youtube_id: string;
  deleted_at: null;
  thumbnail?: string;
  transcript?: SentenceEntity[];
}

export interface SentenceEntity {
  text: string;
  end: number;
  start: number;
  words?: WordEntity[];
}

export interface WordEntity {
  end: number;
  start: number;
  word: number;
}
