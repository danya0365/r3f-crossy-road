// Game settings.

import { LaneType } from "../type";

export const ZOOM = 2.0;

export const CHICKEN_SIZE = 15;

export const POSITION_WIDTH = 42;
export const COLUMNS = 17;
export const BOARD_WIDTH = POSITION_WIDTH * COLUMNS;

export const STEP_TIME = 200;

export const GENERATE_LANES = [
  -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];

export const LANE_TYPES: LaneType[] = ["forest", "field", "road"];

export const THREE_HEIGHTS = [20, 45, 60];

export const LANE_SPEEDS = [2, 2.5, 3];

export const VEHICLE_COLORS = ["#a52523", "#bdb638", "#78b14b"];
