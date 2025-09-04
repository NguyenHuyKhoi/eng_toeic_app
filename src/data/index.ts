import { IExam, IQuestion } from "@model";
import EXAMS from "./exams.json";
import QUESTIONS from "./questions.json";
export class DB {
  static exams({ year }: { year?: number }) {
    return (EXAMS as unknown as IExam[]).filter((u) => u.year === year);
  }

  static exam_detail(id: string) {
    return (EXAMS as unknown as IExam[]).find((u) => u.id === id);
  }

  static questions({ exam_id, parts }: { exam_id: string; parts?: number[] }) {
    return (QUESTIONS as unknown as IQuestion[]).filter(
      (u) => u.exam === exam_id && (parts == null || parts.includes(u.part))
    );
  }

  // static playlists({ channel_id }: { channel_id: string }) {
  //   const result = (PLAYLISTS as unknown as IPlaylist[]).filter(
  //     (u) => u.channel === channel_id
  //   );

  //   result.sort((u, v) => (u.title < v.title ? -1 : 1));
  //   return result;
  // }

  // static videos({ playlist_id, page }: { playlist_id: string; page: number }) {
  //   const total_data = (VIDEOS as unknown as IVideo[]).filter(
  //     (u) => u.playlist === playlist_id
  //   );
  //   total_data.sort((u, v) => (u.duration < v.duration ? -1 : 1));

  //   return paginate(total_data, total_data.length, 15, page);
  // }
}
