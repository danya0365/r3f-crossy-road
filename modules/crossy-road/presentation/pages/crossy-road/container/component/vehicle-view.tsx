'use client';

import { BOARD_WIDTH, POSITION_WIDTH, ZOOM } from '../constant';
import { Lane, OccupyObject } from '../type';
import Texture from './texture';
import { GroupProps, MeshProps, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Color, Group } from 'three';

const aBitBeforeTheBeginningOfLane =
  (-BOARD_WIDTH * ZOOM) / 2 - POSITION_WIDTH * 2 * ZOOM;
const aBitAfterTheEndOFLane =
  (BOARD_WIDTH * ZOOM) / 2 + POSITION_WIDTH * 2 * ZOOM;

export const carFrontTexture = Texture(40, 80, [{ x: 0, y: 10, w: 30, h: 60 }]);
export const carBackTexture = Texture(40, 80, [{ x: 10, y: 10, w: 30, h: 60 }]);
export const carRightSideTexture = Texture(110, 40, [
  { x: 10, y: 0, w: 50, h: 30 },
  { x: 70, y: 0, w: 30, h: 30 }
]);
export const carLeftSideTexture = Texture(110, 40, [
  { x: 10, y: 10, w: 50, h: 30 },
  { x: 70, y: 10, w: 30, h: 30 }
]);

const Wheel = (props: MeshProps) => {
  const color = '#FF5733'; //'#333333';
  const z = 6 * ZOOM;
  return (
    <mesh position={[0, 0, z]} {...props}>
      <boxGeometry attach="geometry" args={[12 * ZOOM, 33 * ZOOM, 22 * ZOOM]} />
      <meshLambertMaterial color={new Color(color)} flatShading />
    </mesh>
  );
};

export const CarView = ({
  lane,
  object,
  ...restProps
}: { lane: Lane; object: OccupyObject } & GroupProps) => {
  const innerRef = useRef<Group>(null!);

  const Main = () => {
    const color = object.primaryColor;
    const z = 12 * ZOOM;
    return (
      <mesh position={[0, 0, z]} castShadow receiveShadow>
        <boxGeometry
          attach="geometry"
          args={[60 * ZOOM, 30 * ZOOM, 15 * ZOOM]}
        />
        <meshPhongMaterial color={new Color(color)} flatShading />
      </mesh>
    );
  };

  const Cabin = () => {
    const z = 25.5 * ZOOM;
    const x = 6 * ZOOM;
    const color = '#cccccc';

    const Top = () => (
      <meshPhongMaterial color={new Color(color)} flatShading />
    );
    const Bottom = () => (
      <meshPhongMaterial color={new Color(color)} flatShading />
    );
    return (
      <mesh position={[x, 0, z]} castShadow receiveShadow>
        <boxGeometry attach="geometry" args={[33 * ZOOM, 24 * ZOOM, 12 * ZOOM]}>
          <meshPhongMaterial
            color={new Color(color)}
            flatShading
            map={carBackTexture}
          />
          <meshPhongMaterial
            color={new Color(color)}
            flatShading
            map={carFrontTexture}
          />
          <meshPhongMaterial
            color={new Color(color)}
            flatShading
            map={carLeftSideTexture}
          />
          <meshPhongMaterial
            color={new Color(color)}
            flatShading
            map={carRightSideTexture}
          />
          <Top />
          <Bottom />
        </boxGeometry>
      </mesh>
    );
  };

  const FrontWheel = () => {
    return <Wheel position={[-18 * ZOOM, 0, 0]} />;
  };

  const BackWheel = () => {
    return <Wheel position={[18 * ZOOM, 0, 0]} />;
  };

  useFrame((state, delta, xrFrame) => {
    const increaseX = (lane.speed / 16) * (delta * 1000);
    if (lane.direction) {
      const isStartOfLane =
        innerRef.current.position.x < aBitBeforeTheBeginningOfLane;
      innerRef.current.position.x = isStartOfLane
        ? aBitAfterTheEndOFLane
        : (innerRef.current.position.x -= increaseX);
    } else {
      const isStartOfLane = innerRef.current.position.x > aBitAfterTheEndOFLane;
      innerRef.current.position.x = isStartOfLane
        ? aBitBeforeTheBeginningOfLane
        : (innerRef.current.position.x += increaseX);
    }
  });

  return (
    <group ref={innerRef} {...restProps} castShadow>
      <Main />
      <Cabin />
      <FrontWheel />
      <BackWheel />
    </group>
  );
};
