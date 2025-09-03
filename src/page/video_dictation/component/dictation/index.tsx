/* eslint-disable no-var */
import { useSelector, useUI } from "@common";
import { globalAlert } from "@component";
import { REWRITE_SPLITER, SentenceEntity } from "@model";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { dictationActions, videoPlayActions } from "@redux";
import { COLORS } from "@theme";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { isInteger } from "lodash";
import { InputIndex } from "./input_index";
export function Dictation() {
  const dispatch = useDispatch();
  const {
    video,
    doing,
    sentence_idx,
    complete_sentence_idxs,
    complete_sentences,
  } = useSelector((x) => x.dictation);
  const [target_words, setTargetWords] = useState<string[]>([]);
  const [entered_words, setEnteredWords] = useState<string[]>([]);
  const [index_typing, setIndexTyping] = useState<boolean>(false);
  const [enterer_str, setEnteredStr] = useState<string>("");
  const [word_idx, setWordIdx] = useState<number>(0);

  const transcript = video.transcript;

  const sentence = transcript[sentence_idx];

  const getPunctuations = useCallback(() => {
    var result: Map<string, string> = new Map();
    console.log("Sentence: ", sentence);
    const words = sentence.text
      .replaceAll("’", "'")
      .split(" ")
      .map((u) => u.trim())
      .filter((u) => u != "");

    console.log("Words: ", words);
    for (var i = 0; i < words.length; i++) {
      if (![".", ",", "?", "!"].includes(words[i])) {
        continue;
      }
      const pre_word = i == 0 ? "" : words[i - 1];
      const after_word = i === words.length - 1 ? "" : words[i + 1];

      result.set(
        pre_word.toLocaleLowerCase() +
          REWRITE_SPLITER +
          after_word.toLocaleLowerCase(),
        words[i]
      );
    }
    return result;
  }, [sentence]);

  const punctuations: Map<string, string> = getPunctuations();

  const getPunctuationAfter = useCallback(
    (w_i: number) => {
      if (target_words.length <= w_i) {
        return undefined;
      }
      const punc_key =
        target_words[w_i].toLocaleLowerCase() +
        REWRITE_SPLITER +
        (w_i === target_words.length - 1
          ? ""
          : target_words[w_i + 1].toLocaleLowerCase());

      const punc_val = punctuations.get(punc_key);
      //console.log('Get punctual after ', punc_key, punc_val, target_words[w_i])
      return punc_val;
    },
    [punctuations, target_words]
  );

  const sentenceRef = useRef<SentenceEntity>(null);

  useEffect(() => {
    sentenceRef.current = transcript[sentence_idx];
  }, [sentence_idx, transcript]);

  const answered = complete_sentence_idxs.includes(sentence_idx);

  const setupData = useCallback(() => {
    if (!video) {
      return;
    }
    if (sentence_idx == -1) {
      return;
    }

    setWordIdx(0);
    setEnteredStr("");
    const words = sentence.text
      .replaceAll("—", " ")
      .split(" ")
      .map((u) => u.trim().replaceAll("’", "'"))
      .filter((u) => /^[a-zA-Z0-9-'’]+$/.test(u) && u != "'");
    setTargetWords(words);
    if (answered) {
      setEnteredWords(complete_sentences[sentence_idx].split(REWRITE_SPLITER));
    } else {
      setEnteredWords(words.map((u) => "_".repeat(u.length)));
    }
  }, [video, sentence_idx, sentence.text, answered, complete_sentences]);

  useEffect(() => {
    setupData();
  }, [setupData]);

  const markComplete = useCallback(() => {
    dispatch(
      dictationActions.completeSentence({
        idx: sentence_idx,
        entered_words: entered_words,
      })
    );
  }, [dispatch, sentence_idx, entered_words]);

  const markUncomplete = useCallback(() => {
    setEnteredWords(target_words.map((u) => "_".repeat(u.length)));
    setEnteredStr("");
    setWordIdx(0);
    dispatch(dictationActions.uncompleteSentence(sentence_idx));
  }, [target_words, dispatch, sentence_idx]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        if (sentenceRef?.current) {
          const sentence_index = video.transcript.findIndex(
            (u) => u.start === sentenceRef.current.start
          );
          dispatch(
            videoPlayActions.playSentence({
              sentence: sentenceRef.current,
              index: sentence_index,
            })
          );
        }
      } else if (e.key === "\\") {
        if (answered) {
          markUncomplete();
        } else {
          markComplete();
        }
      } else if (e.key === "ArrowRight") {
        if (answered) {
          if (sentence_idx < transcript.length - 1) {
            dispatch(dictationActions.setSentenceIdx(sentence_idx + 1));
          }
        }
      }
    };

    if (doing) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    markComplete,
    answered,
    doing,
    video.transcript,
    dispatch,
    markUncomplete,
    sentence_idx,
    transcript.length,
  ]);

  const nextWord = useCallback(() => {
    const next_idx = word_idx >= target_words.length - 1 ? 0 : word_idx + 1;
    setWordIdx(next_idx);

    const _pos = entered_words[next_idx].indexOf("_");
    setEnteredStr(entered_words[next_idx].slice(0, _pos == -1 ? 1000 : _pos));
  }, [target_words, word_idx, entered_words]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const char = e.key;

      if (char === "ArrowLeft") {
        const pre_idx = word_idx > 0 ? word_idx - 1 : target_words.length - 1;
        setWordIdx(pre_idx);
        const _pos = entered_words[pre_idx].indexOf("_");
        setEnteredStr(
          entered_words[pre_idx].slice(0, _pos == -1 ? 1000 : _pos)
        );
        return;
      }
      if (char === "Backspace" || char === "Delete") {
        if (enterer_str.length == 0) {
          if (word_idx == 0) {
            return;
          }
          // Check if current word is entered:

          const pre_idx = word_idx - 1;
          const pre_words = entered_words[pre_idx];
          setWordIdx(pre_idx);
          const new_pre_str = pre_words.slice(0, pre_words.length - 1);
          const c_entered_words = [...entered_words];
          c_entered_words[pre_idx] =
            new_pre_str +
            "_".repeat(target_words[pre_idx].length - new_pre_str.length);

          setEnteredWords(c_entered_words);
          setEnteredStr(new_pre_str);
          return;
        }
        const new_str = enterer_str.slice(0, enterer_str.length - 1);
        const c_entered_words = [...entered_words];
        c_entered_words[word_idx] =
          new_str + "_".repeat(target_words[word_idx].length - new_str.length);

        setEnteredWords(c_entered_words);
        setEnteredStr(new_str);
        return;
      }

      if (char === " " || char === "ArrowRight") {
        nextWord();
        return;
      }

      if (char.length != 1 || !/^[a-zA-Z0-9'-]$/.test(char)) {
        return;
      }

      var new_str = enterer_str + char;
      if (enterer_str.length >= target_words[word_idx].length) {
        return;
      }

      const c_entered_words = [...entered_words];
      c_entered_words[word_idx] =
        new_str + "_".repeat(target_words[word_idx].length - new_str.length);

      setEnteredWords(c_entered_words);
      setEnteredStr(new_str);
    },
    [target_words, entered_words, enterer_str, word_idx, nextWord]
  );

  const resetHistory = useCallback(async () => {
    if (!video) {
      return;
    }
    dispatch(dictationActions.restart());
  }, [dispatch, video]);

  const { window_width } = useUI();
  if (!video) {
    return <div />;
  }

  return (
    <Stack
      sx={{
        position: "relative",
        width: window_width * 0.8,
        alignSelf: "center",
        mt: 2,
        borderRadius: "4px",
        border: `1px solid ${COLORS.nickel}`,
        px: 1.5,
        py: 0.8,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Tooltip title="Restart from first sentence?">
          <RestartAltIcon
            onClick={() => {
              globalAlert.show({
                title: "Are you sure?",
                onConfirm: resetHistory,
              });
            }}
            sx={{
              fontSize: 24,
              color: COLORS.DarkCharcoal,
              cursor: "pointer",
            }}
          />
        </Tooltip>

        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <ArrowBackOutlinedIcon
            onClick={() => {
              if (sentence_idx == 0) {
                dispatch(
                  dictationActions.setSentenceIdx(video.transcript.length - 1)
                );
                return;
              }
              dispatch(dictationActions.setSentenceIdx(sentence_idx - 1));
            }}
            sx={{
              fontSize: "24px",
              color: COLORS.nickel,
              cursor: "pointer",
            }}
          />

          {!index_typing ? (
            <Tooltip title="Click sentence index to enter specific index">
              <Box
                onClick={() => {
                  setIndexTyping(true);
                }}
              >
                <Typography
                  style={{
                    fontSize: "24px",
                    fontWeight: "400",
                    color: COLORS.DarkCharcoal,
                  }}
                >
                  {`${(sentence_idx + 1).toString().padStart(2, "0")} / ${
                    video.transcript.length
                  }`}
                </Typography>
              </Box>
            </Tooltip>
          ) : (
            <Stack direction={"row"} alignItems={"center"}>
              <InputIndex
                props_value={sentence_idx + 1}
                max_value={transcript.length}
                onSubmit={(val: number) => {
                  dispatch(dictationActions.setSentenceIdx(val));
                  setIndexTyping(false);
                }}
              />
              <Typography
                style={{
                  fontSize: "24px",
                  fontWeight: "400",
                  color: COLORS.DarkCharcoal,
                  marginLeft: "12px",
                }}
              >
                {` / ${video.transcript.length}`}
              </Typography>
            </Stack>
          )}

          <ArrowForwardOutlinedIcon
            onClick={() => {
              if (sentence_idx >= video.transcript.length - 1) {
                dispatch(dictationActions.setSentenceIdx(0));
                return;
              }
              dispatch(dictationActions.setSentenceIdx(sentence_idx + 1));
            }}
            sx={{
              fontSize: "24px",
              color: COLORS.nickel,
              cursor: "pointer",
            }}
          />
        </Stack>

        {answered ? (
          <Tooltip title="Try again">
            <ReplayOutlinedIcon
              onClick={markUncomplete}
              sx={{
                fontSize: 24,
                color: COLORS.DarkCharcoal,

                cursor: "pointer",
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Check">
            <AssignmentTurnedInOutlinedIcon
              onClick={markComplete}
              sx={{
                fontSize: 24,
                color: COLORS.DarkCharcoal,
                cursor: "pointer",
              }}
            />
          </Tooltip>
        )}
      </Stack>

      <Stack sx={{}}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          sx={{ flexWrap: "wrap", alignSelf: "center", mt: 4 }}
          spacing={2}
          rowGap={1}
        >
          {entered_words.map((word, w_i) => {
            const is_correct =
              entered_words[w_i]?.toLocaleLowerCase() ===
              target_words[w_i]?.toLocaleLowerCase();

            return (
              <Tooltip title={answered ? "Tra từ này" : undefined}>
                <Stack
                  onClick={() => {
                    if (!answered) {
                      return;
                    }
                    dispatch(
                      dictationActions.focusWord(
                        target_words[w_i].toLocaleLowerCase()
                      )
                    );
                  }}
                  direction={"row"}
                  alignItems={"center"}
                  spacing={0.2}
                  sx={{
                    borderBottom:
                      w_i == word_idx && is_correct && !answered
                        ? `2px solid ${COLORS.MellowApricot}`
                        : undefined,
                    position: "relative",
                    cursor: answered ? "pointer" : undefined,
                  }}
                >
                  {word.split("").map((char, c_i) => (
                    <Typography
                      style={{
                        fontSize: 22,
                        fontWeight: 500,
                        color: is_correct
                          ? COLORS.DarkSpringGreen
                          : answered
                          ? COLORS.DarkSpringGreen
                          : w_i === word_idx
                          ? COLORS.Beer
                          : COLORS.DarkCharcoal,
                      }}
                    >
                      {!answered ? char : target_words[w_i][c_i]}
                    </Typography>
                  ))}
                  {getPunctuationAfter(w_i) != undefined && (
                    <Typography
                      style={{
                        fontSize: 20,
                        color: answered
                          ? COLORS.DarkSpringGreen
                          : COLORS.DarkCharcoal,
                        marginLeft: "12px",
                        marginTop: "6px",
                      }}
                    >
                      {getPunctuationAfter(w_i)}
                    </Typography>
                  )}
                  {!is_correct && answered && (
                    <Typography
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: COLORS.Crimson,
                        textDecorationLine: "line-through",
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        bottom: "-14px",
                      }}
                    >
                      {word.replaceAll("_", "*")}
                    </Typography>
                  )}
                </Stack>
              </Tooltip>
            );
          })}
        </Stack>

        {!answered && doing ? (
          <input
            type="text"
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Type here"
            value={""}
            style={{
              padding: "10px 10px 6px 6px",
              fontSize: "16px",
              textAlign: "center",
              width: "160px",
              height: "32px",
              alignSelf: "center",
              border: `1px solid ${COLORS.MellowApricot}`,
              borderRadius: "4px",
              marginTop: "12px",
              backgroundColor: "#fff",
            }}
          />
        ) : (
          <div style={{ height: "60px" }} />
        )}
      </Stack>
      <Stack
        sx={{
          position: "absolute",
          bottom: "5px",
          right: "-5px",
        }}
      ></Stack>
    </Stack>
  );
}
