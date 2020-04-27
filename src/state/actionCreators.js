import * as types from "./actionTypes";

export function toggleLiklihood(type, entry) {
  return {
    type: toggleLiklihood,
    payload: {
      type: type,
      entry: entry
    }
  };
}