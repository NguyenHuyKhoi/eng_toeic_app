/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { formatDuration, useUI } from "@common";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import { Box, Stack } from "@mui/material";
import { COLORS } from "@theme";
import { Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
export function AudioPlayer({
  audio_duration,
  audio_url,
  audio_playing,
  onChangePlayTime,
}: {
  audio_url: string;
  audio_duration: number;
  audio_playing?: boolean;
  onChangePlayTime?: (a: number) => void;
}) {
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState<boolean>(false);
  const [play_time, setPlayTime] = useState<number>(0);
  const [seek_time, setSeekTime] = useState<number>(0);

  useEffect(() => {
    if (audio_playing !== undefined) {
      setPlaying(audio_playing);
    }
  }, [audio_playing]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const percent =
    audio_duration > 0 ? Math.floor((play_time / audio_duration) * 100) : 0;

  useEffect(() => {
    onChangePlayTime?.(play_time);
  }, [onChangePlayTime, play_time]);

  // Handle play/pause
  useEffect(() => {
    const audioObj = audioRef.current;
    if (!audioObj) return;

    if (playing) {
      audioObj.play().catch(console.error);
    } else {
      audioObj.pause();
    }
  }, [playing]);

  useEffect(() => {
    if (seek_time == undefined || !audioRef.current) {
      return;
    }
    audioRef.current.currentTime = seek_time;
    setPlayTime(seek_time);
    setSeekTime(undefined);
  }, [seek_time, audioRef.current]);

  // Update audio time in redux
  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      if (!isDragging) {
        setPlayTime(audio.currentTime);
      }
    };
    if (audio) {
      audio.addEventListener("timeupdate", updateTime);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [dispatch, isDragging, audioRef.current]);

  // Click to seek
  const handleProgressClick = (e: any) => {
    const bar = progressBarRef.current;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = Math.min(Math.max(clickX / width, 0), 1);

    const newTime = clickPercent * audio_duration;
    audioRef.current.currentTime = newTime;
    setPlayTime(newTime);
  };

  // Handle drag start
  const handleDragStart = (e: any) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle dragging
  const handleDragMove = (e: any) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX);
    if (!clientX) return;

    const bar = progressBarRef.current;
    const rect = bar.getBoundingClientRect();
    const dragX = clientX - rect.left;
    const width = rect.width;
    const dragPercent = Math.min(Math.max(dragX / width, 0), 1);

    const newTime = dragPercent * audio_duration;
    setPlayTime(newTime);
  };

  // Handle drag end
  const handleDragEnd = (e: any) => {
    setIsDragging(false);

    const clientX =
      e.clientX || (e.changedTouches && e.changedTouches[0]?.clientX);
    if (!clientX) return;

    const bar = progressBarRef.current;
    const rect = bar.getBoundingClientRect();
    const endX = clientX - rect.left;
    const width = rect.width;
    const endPercent = Math.min(Math.max(endX / width, 0), 1);

    const newTime = endPercent * audio_duration;
    audioRef.current.currentTime = newTime;
    setPlayTime(newTime);
  };

  const { is_mobile } = useUI();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        py: 0.5,
        backgroundColor: `#00000066`,
        borderRadius: "4px",
        padding: is_mobile ? "2px 6px" : "2px 20px",
      }}
    >
      {audio_url && <audio ref={audioRef} src={audio_url} />}

      {/* Play / Pause Button */}
      <Box
        onClick={() => {
          setPlaying(!playing);
        }}
        sx={{ cursor: "pointer", marginRight: "10px" }}
      >
        {!playing ? (
          <PlayCircleOutlinedIcon
            sx={{ fontSize: 26, color: "#fff", marginTop: "6px" }}
          />
        ) : (
          <PauseCircleOutlinedIcon
            sx={{ fontSize: 26, color: "#fff", marginTop: "6px" }}
          />
        )}
      </Box>

      {/* Current Time */}
      <Typography.Text
        style={{ fontSize: 14, color: COLORS.white, fontWeight: "600" }}
      >
        {formatDuration(play_time)}
      </Typography.Text>

      {/* Progress Bar */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          height: "4px",
          backgroundColor: COLORS.bright_Gray,
          borderRadius: "6px",
          cursor: "pointer",
          ml: 2,
          mr: 2,
        }}
        ref={progressBarRef}
        onClick={handleProgressClick}
      >
        {/* Filled progress */}
        <Box
          sx={{
            width: `${percent}%`,
            height: "4px",
            backgroundColor: "#91CAFF",
            borderRadius: "6px",
          }}
        />

        {/* Draggable circle */}
        <Box
          sx={{
            width: "14px",
            height: "14px",
            borderRadius: "30px",
            border: `2px solid #91CAFF`,
            backgroundColor: "#fff",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
            left: `${percent}%`,
            zIndex: 2,
            cursor: "grab",
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
      </Box>

      {/* Duration */}
      <Typography.Text
        style={{ fontSize: 14, color: COLORS.white, fontWeight: "600" }}
      >
        {formatDuration(audio_duration)}
      </Typography.Text>

      {/* Global drag listeners */}
      {isDragging && (
        <Box
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
          }}
        />
      )}
    </Stack>
  );
}
