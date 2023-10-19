"use client";

import {
  BOARD_WIDTH,
  POSITION_WIDTH,
  ZOOM,
} from "../../../../../domain/constant/constant";
import { Lane } from "../../../../../domain/type";
import TreeView from "./tree-view";
import { CarView } from "./vehicle-view";

const OccupiesView = ({ lane }: { lane: Lane }) => {
  return lane.occupies.map((object) => {
    if (object.type === "tree") {
      const x =
        (object.position * POSITION_WIDTH + POSITION_WIDTH / 2) * ZOOM -
        (BOARD_WIDTH * ZOOM) / 2;
      return (
        <TreeView
          lane={lane}
          object={object}
          key={`tree-${lane.laneNumber}-${object.position}`}
          position={[x, 0, 0]}
        />
      );
    }
    if (object.type === "car") {
      const x =
        (object.position * POSITION_WIDTH * 2 + POSITION_WIDTH / 2) * ZOOM -
        (BOARD_WIDTH * ZOOM) / 2;
      const z = !lane.direction ? Math.PI : 0;
      return (
        <CarView
          lane={lane}
          object={object}
          key={`car-${lane.laneNumber}-${object.position}`}
          position={[x, 0, 0]}
          rotation={[0, 0, z]}
        />
      );
    }
    return null;
  });
};

export default OccupiesView;
