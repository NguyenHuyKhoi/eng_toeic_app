const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const isChromeAndroid =
  /Android/.test(navigator.userAgent) && /Chrome/.test(navigator.userAgent);

const hasBottomTabBar = isChromeAndroid; // giả định Safari iOS không có thanh tab

export const bottomPadding = hasBottomTabBar
  ? "env(safe-area-inset-bottom, 24px)"
  : "0px";
