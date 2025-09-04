/* eslint-disable no-var */
import { CSSProperties } from "react";
import { Bounce, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export interface ToastConfig {
  content: string;
  duration?: number;
  type?: "info" | "success" | "warning" | "error" | "default";
  position?: ToastPosition;
  toastStyle?: CSSProperties;
}
export const showToast = ({
  content,
  type,
  duration,
  position,
  toastStyle,
}: ToastConfig) => {
  var func;
  switch (type) {
    case "error":
      func = toast.error;
      break;
    case "success":
      func = toast.success;
      break;
    case "warning":
      func = toast.warn;
      break;
    case "info":
      func = toast.info;
      break;
    default:
      func = toast;
  }
  func(content, {
    autoClose: duration ?? 3000,
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
    position,
    style: toastStyle,
  });
};

export const showApiError = (e: any) => {
  showToast({
    content: e?.response?.data?.message ?? "Thao tác không thành công",
    type: "error",
  });
};

export const showApiSuccess = (content?: string) => {
  showToast({ content: content ?? "Thao tác thành công", type: "success" });
};
