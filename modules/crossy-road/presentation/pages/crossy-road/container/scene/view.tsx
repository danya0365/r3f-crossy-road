'use client';

import BackDirectionalLight from '../component/back-directional-light';
import ChickenView from '../component/chicken-view';
import LanesView from '../component/lanes-view';
import MainDirectionalLight from '../component/main-directional-light';
import {
  DISTANCE,
  INITIAL_CAMERA_POSITION_X,
  INITIAL_CAMERA_POSITION_Y,
  ROTATE_X,
  ROTATE_Y
} from '../constant';
import GameController from '../game-controller';
import { OrthographicCamera } from '@react-three/drei';
import { useLayoutEffect, useRef } from 'react';
import { Color, DirectionalLight, Group } from 'three';

const SceneView = () => {
  const chickenRef = useRef<Group>(null!);
  const lightRef = useRef<DirectionalLight>(null!);

  useLayoutEffect(() => {
    lightRef.current.target = chickenRef.current;
  }, []);
  return (
    <>
      <ChickenView ref={chickenRef} />
      <OrthographicCamera
        makeDefault
        rotation={[ROTATE_X, ROTATE_Y, (10 * Math.PI) / 180]}
        position={[
          INITIAL_CAMERA_POSITION_X,
          INITIAL_CAMERA_POSITION_Y,
          DISTANCE
        ]}
      >
        <MainDirectionalLight ref={lightRef} />
      </OrthographicCamera>
      <BackDirectionalLight />
      <hemisphereLight
        args={[new Color('#ffffff'), new Color('#ffffff'), 0.6]}
      />
      <LanesView />
      <GameController />
    </>
  );
};

export default SceneView;
