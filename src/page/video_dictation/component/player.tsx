import { useSelector, useUI } from "@common";
import { IVideo } from "@model";
import { Stack } from "@mui/material";
import { videoPlayActions } from "@redux";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
export function VideoPlayer({ data }: { data: IVideo }) {
  const { focus_sentence_index, end_time, playing, seek_time } = useSelector(
    (x) => x.video_play
  );
  const dispatch = useDispatch();

  const playerRef = useRef<ReactPlayer>(null);

  const { window_width } = useUI();
  const VIDEO_WIDTH = window_width * 0.45;
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    if (!data) {
      return;
    }
    const focus_index =
      data?.transcript.findIndex((item) => currentTime < item.start) - 1;
    if (focus_index !== focus_sentence_index) {
      dispatch(
        videoPlayActions.setSentenceIndex(focus_index == -1 ? 0 : focus_index)
      );
    }
  }, [currentTime, data, dispatch, focus_sentence_index]);

  useEffect(() => {
    if (end_time != undefined && currentTime > end_time) {
      dispatch(videoPlayActions.setPlaying(false));
    }
  }, [currentTime, dispatch, end_time]);

  const handleSeek = (seconds: number) => {
    setCurrentTime(seconds);
  };

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (Math.floor(playedSeconds) === currentTime) {
      return;
    }
    setCurrentTime(playedSeconds);
  };

  useEffect(() => {
    if (seek_time == undefined) {
      return;
    }
    console.log("Seek time: ", seek_time);

    playerRef?.current?.seekTo(Math.floor(seek_time));
    dispatch(videoPlayActions.setPlaying(true));
    dispatch(videoPlayActions.seekTime(undefined));
  }, [dispatch, seek_time]);

  return (
    <Stack
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
      }}
    >
      <ReactPlayer
        ref={playerRef}
        width={VIDEO_WIDTH}
        onPause={() => {
          dispatch(videoPlayActions.setPlaying(false));
        }}
        onPlay={() => {
          dispatch(videoPlayActions.setPlaying(true));
        }}
        onSeek={handleSeek}
        onProgress={handleProgress}
        progressInterval={500}
        height={(VIDEO_WIDTH / 16) * 9}
        url={`https://www.youtube.com/watch?v=${data.youtube_id}&rel=0`}
        controls
        style={{ borderRadius: "6px", overflow: "hidden" }}
        playing={playing}
      />
    </Stack>
  );
}
