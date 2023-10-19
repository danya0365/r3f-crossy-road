"use client";

import {
  BOARD_WIDTH,
  POSITION_WIDTH,
  ZOOM,
} from "../../../../../domain/constant/constant";
import { Lane } from "../../../../../domain/type";
import { PropsWithChildren } from "react";
import { Color } from "three";
import OccupiesView from "./occupies-view";

const RoadView = ({ lane, children }: { lane: Lane } & PropsWithChildren) => {
  const laneNumber = lane.laneNumber;
  const MiddleSection = ({ color }: { color: string }) => {
    return (
      <mesh receiveShadow>
        <planeGeometry
          attach="geometry"
          args={[BOARD_WIDTH * ZOOM, POSITION_WIDTH * ZOOM]}
        />
        <meshPhongMaterial color={new Color(color)} />
      </mesh>
    );
  };
  const LeftSection = ({ color }: { color: string }) => {
    return (
      <mesh position={[-BOARD_WIDTH * ZOOM, 0, 0]}>
        <planeGeometry
          attach="geometry"
          args={[BOARD_WIDTH * ZOOM, POSITION_WIDTH * ZOOM]}
        />
        <meshPhongMaterial color={new Color(color)} />
      </mesh>
    );
  };
  const RightSection = ({ color }: { color: string }) => {
    return (
      <mesh position={[BOARD_WIDTH * ZOOM, 0, 0]}>
        <planeGeometry
          attach="geometry"
          args={[BOARD_WIDTH * ZOOM, POSITION_WIDTH * ZOOM]}
        />
        <meshPhongMaterial color={new Color(color)} />
      </mesh>
    );
  };

  const y = laneNumber * POSITION_WIDTH * ZOOM;
  const z = 1.5 * ZOOM;

  return (
    <group position={[0, y, z]}>
      <MiddleSection color={"#454a59"} />
      <LeftSection color={"#393d49"} />
      <RightSection color={"#393d49"} />
      <OccupiesView lane={lane} />
      {children}
    </group>
  );
};

export default RoadView;
