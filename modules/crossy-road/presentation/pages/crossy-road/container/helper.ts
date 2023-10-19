import {
  COLUMNS,
  LANE_SPEEDS,
  LANE_TYPES,
  THREE_HEIGHTS,
  VEHICLE_COLORS,
} from "./constant";
import { Lane, OccupyObject } from "./type";

export namespace LaneHelper {
  export const createLane = (index: number): Lane => {
    const type =
      index <= 0
        ? "field"
        : LANE_TYPES[Math.floor(Math.random() * LANE_TYPES.length)];

    switch (type) {
      case "field": {
        return {
          laneNumber: index,
          type: "field",
          occupies: [],
          speed: 0,
          direction: false,
        };
      }
      case "road": {
        const numberOfCars = [1, 2, 3];
        const occupiedPositions: number[] = [];
        for (const _ of numberOfCars) {
          let treePosition;
          do {
            treePosition = Math.floor((Math.random() * COLUMNS) / 2);
          } while (occupiedPositions.includes(treePosition));
          occupiedPositions.push(treePosition);
        }
        const occupies: OccupyObject[] = occupiedPositions.map(
          (val, occIndex) => {
            const height =
              THREE_HEIGHTS[Math.floor(Math.random() * THREE_HEIGHTS.length)];
            return {
              id: parseInt(`${index}` + `${occIndex}`),
              position: val,
              height: height,
              type: "car",
              primaryColor:
                VEHICLE_COLORS[
                  Math.floor(Math.random() * VEHICLE_COLORS.length)
                ],
              secondaryColor:
                VEHICLE_COLORS[
                  Math.floor(Math.random() * VEHICLE_COLORS.length)
                ],
            };
          }
        );
        return {
          laneNumber: index,
          type: "road",
          occupies,
          speed: LANE_SPEEDS[Math.floor(Math.random() * LANE_SPEEDS.length)],
          direction: Math.random() >= 0.5,
        };
      }
      case "forest": {
        const numberOfTrees = [1, 2, 3, 4];
        const occupiedPositions: number[] = [];
        for (const _ of numberOfTrees) {
          let treePosition;
          do {
            treePosition = Math.floor(Math.random() * COLUMNS);
          } while (occupiedPositions.includes(treePosition));
          occupiedPositions.push(treePosition);
        }
        const occupies: OccupyObject[] = occupiedPositions.map(
          (val, occIndex) => {
            const height =
              THREE_HEIGHTS[Math.floor(Math.random() * THREE_HEIGHTS.length)];
            return {
              id: parseInt(`${index}` + `${occIndex}`),
              position: val,
              height: height,
              type: "tree",
              primaryColor: "#4d2926",
              secondaryColor: "#7aa21d",
            };
          }
        );
        return {
          laneNumber: index,
          type: "forest",
          occupies,
          speed: 0,
          direction: false,
        };
      }
    }
  };
}
