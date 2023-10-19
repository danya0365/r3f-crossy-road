import { Lane, MoveDirection } from "../type";
import { atom } from "recoil";

export const isReadyState = atom<boolean>({
  key: "is-ready",
  default: false,
});

export const scoreState = atom<number>({
  key: "score",
  default: 0,
});

export const movesState = atom<MoveDirection[]>({
  key: "moves",
  default: [],
});

export const lanesState = atom<Lane[]>({
  key: "lanes",
  default: [],
});

export const currentLaneState = atom<number>({
  key: "current-lane",
  default: 0,
});

export const currentColumnState = atom<number>({
  key: "current-column",
  default: 0,
});

export const stepStartTimestampState = atom<number>({
  key: "step-start-timestamp",
  default: 0,
});

export const startMovingState = atom<boolean>({
  key: "start-moving",
  default: false,
});
