'use client';

import { ZOOM } from '../constant';
import { Lane, OccupyObject } from '../type';
import { GroupProps } from '@react-three/fiber';
import { Color } from 'three';

const TreeView = ({
  lane,
  object,
  ...restProps
}: { lane: Lane; object: OccupyObject } & GroupProps) => {
  const Trunk = () => {
    const z = 10 * ZOOM;
    return (
      <mesh position={[0, 0, z]} castShadow receiveShadow>
        <boxGeometry
          attach="geometry"
          args={[15 * ZOOM, 15 * ZOOM, 20 * ZOOM]}
        />
        <meshPhongMaterial color={new Color(object.primaryColor)} flatShading />
      </mesh>
    );
  };

  const Crown = () => {
    const height = object.height;
    const z = (height / 2 + 20) * ZOOM;
    return (
      <mesh position={[0, 0, z]} castShadow>
        <boxGeometry
          attach="geometry"
          args={[30 * ZOOM, 30 * ZOOM, height * ZOOM]}
        />
        <meshLambertMaterial
          color={new Color(object.secondaryColor)}
          flatShading
        />
      </mesh>
    );
  };
  return (
    <group {...restProps}>
      <Trunk />
      <Crown />
    </group>
  );
};

export default TreeView;
