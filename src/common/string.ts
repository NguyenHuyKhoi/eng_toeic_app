/* eslint-disable no-var */
import { SentenceEntity } from "@model";
import removeAccents from "remove-accents";
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60);
  const paddedSecs = secs.toString().padStart(2, "0");

  return `${minutes}:${paddedSecs}`;
}
export function createSlug(values: string[]) {
  return values
    .map((value) =>
      removeAccents(value).toLocaleLowerCase().trim().replace(/\s+/g, "-")
    )
    .join("-");
}

export function cleanWord(word: string) {
  return word.replace(/[^a-zA-Z\-']/g, "").toLocaleLowerCase();
}

export function normalizeTranscript(transcript: SentenceEntity[]) {
  return adjustEndTime(
    transcript.map((u) => ({
      ...u,
      text: u.text
        .replaceAll("?", " ? ")
        .replaceAll("!", " ! ")
        .replaceAll(".", " . ")
        .replaceAll(",", " , ")
        .replaceAll("\n", " "),
    }))
  );
}
export function randomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

export function splitFragmentsIntoSentences(
  fragments: SentenceEntity[]
): SentenceEntity[] {
  const sentences: SentenceEntity[] = [];

  const dot_count = fragments.filter(({ text }) => /[.?!]/.test(text)).length;
  if (dot_count < 10) {
    return fragments;
  }
  let sentence: SentenceEntity | null = null;
  for (const frag_cur of fragments) {
    const frag_words = frag_cur.text.split(" ");
    for (const frag_word of frag_words) {
      if (sentence == null) {
        sentence = {
          text: frag_word,
          start: frag_cur.start,
          end: null,
        };
      } else {
        sentence.text += " " + frag_word;
      }
      const is_end_sentence = /[.?!]/.test(frag_word);
      if (is_end_sentence) {
        sentences.push(sentence);
        sentence = null;
        continue;
      }
    }
  }
  if (sentence != null) {
    sentences.push(sentence);
  }

  return adjustEndTime(sentences);
}

function adjustEndTime(transcript: SentenceEntity[]) {
  const result: SentenceEntity[] = [];
  for (let i = 0; i < transcript.length; i++) {
    const { start, text } = transcript[i];
    const normalize_text = text
      .replaceAll("?", " ? ")
      .replaceAll("!", " ! ")
      .replaceAll(".", " . ")
      .replaceAll(",", " , ")
      .replaceAll("\n", " ");

    if (i === transcript.length - 1) {
      result.push({
        start,
        text: normalize_text,
        end: 60 * 100,
      });
      continue;
    }
    var next_i: number = i + 1;
    while (next_i < transcript.length) {
      if (Math.floor(transcript[next_i].start) > Math.floor(start)) {
        break;
      }
      next_i++;
    }
    result.push({
      start,
      text: normalize_text,
      end: next_i === transcript.length ? 60 * 100 : transcript[next_i].start,
    });
  }
  console.log("Sentence:", result.slice(0, 10));
  return result;
}
