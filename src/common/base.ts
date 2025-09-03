import { useSelector as useReduxSelector } from "react-redux";

import { RootState } from "@redux";
import isEqual from "react-fast-compare";
function useSelector<T>(
  selector: (state: RootState) => T,
  equalityFn = isEqual
): T {
  return useReduxSelector<RootState, T>(selector, equalityFn);
}

export { useSelector };
