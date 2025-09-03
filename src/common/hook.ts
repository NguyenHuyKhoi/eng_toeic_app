/* eslint-disable @typescript-eslint/no-explicit-any */
import { uiActions } from "@redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "./base";

export const useUI = () => {
  const { window_width, window_height } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(uiActions.setWindowWidth(window.innerWidth));
      dispatch(uiActions.setWindowHeight(window.innerHeight));
    };

    // Set initial window size
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return { window_width, window_height };
};
