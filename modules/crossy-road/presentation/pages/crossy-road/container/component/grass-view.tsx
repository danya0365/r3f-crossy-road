"use client";

import {
  BOARD_WIDTH,
  POSITION_WIDTH,
  ZOOM,
} from "../../../../../domain/constant/constant";
import { Lane } from "../../../../../domain/type";
import { PropsWithChildren } from "react";
import { Color } from "three";

const GrassView = ({ lane, children }: { lane: Lane } & PropsWithChildren) => {
  const laneNumber = lane.laneNumber;
  const MiddleGrass = ({ color }: { color: string }) => {
    return (
      <mesh receiveShadow>
        <boxGeometry
          attach="geometry"
          args={[BOARD_WIDTH * ZOOM, POSITION_WIDTH * ZOOM, 3 * ZOOM]}
        />
        <meshPhongMaterial color={new Color(color)} />
      </mesh>
    );
  };

  const LeftGrass = ({ color }: { color: string }) => {
    return (
      <mesh position={[-BOARD_WIDTH * ZOOM, 0, 0]}>
        <boxGeometry
          attach="geometry"
          args={[BOARD_WIDTH * ZOOM, POSITION_WIDTH * ZOOM, 3 * ZOOM]}
        />
        <meshPhongMaterial color={new Color(color)} />
      </mesh>
    );
  };

  const RightGrass = ({ color }: { color: string }) => {
    return (
      <mesh position={[BOARD_WIDTH * ZOOM, 0, 0]}>
        <boxGeometry
          attach="geometry"
          args={[BOARD_WIDTH * ZOOM, POSITION_WIDTH * ZOOM, 3 * ZOOM]}
        />
        <meshPhongMaterial color={new Color(color)} />
      </mesh>
    );
  };

  const y = laneNumber * POSITION_WIDTH * ZOOM;
  const z = 1.5 * ZOOM;

  return (
    <group position={[0, y, z]}>
      <MiddleGrass color={"#baf455"} />
      <LeftGrass color={"#99c846"} />
      <RightGrass color={"#99c846"} />
      {children}
    </group>
  );
};

export default GrassView;
