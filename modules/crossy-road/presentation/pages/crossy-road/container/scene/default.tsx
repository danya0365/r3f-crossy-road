"use client";

import BackDirectionalLight from "../component/back-directional-light";
import ChickenView from "../component/chicken-view";
import LanesView from "../component/lanes-view";
import MainDirectionalLight from "../component/main-directional-light";
import {
  DISTANCE,
  INITIAL_CAMERA_POSITION_X,
  INITIAL_CAMERA_POSITION_Y,
  INITIAL_CAMERA_POSITION_Z,
  ROTATE_X,
  ROTATE_Y,
  ROTATE_Z,
} from "../../../../../domain/constant/Orthographic-camera";
import GameController from "../component/game-controller";
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { useLayoutEffect, useRef, useState } from "react";
import { Color, DirectionalLight, Group } from "three";

const SceneDefaultView = () => {
  const chickenRef = useRef<Group>(null!);
  const lightRef = useRef<DirectionalLight>(null!);

  useLayoutEffect(() => {
    lightRef.current.target = chickenRef.current;
  }, []);
  return (
    <>
      <ChickenView ref={chickenRef} />
      <OrthographicCamera
        rotation={[ROTATE_X, ROTATE_Y, ROTATE_Z]}
        position={[
          INITIAL_CAMERA_POSITION_X,
          INITIAL_CAMERA_POSITION_Y,
          INITIAL_CAMERA_POSITION_Z,
        ]}
        makeDefault
      >
        <MainDirectionalLight ref={lightRef} />
      </OrthographicCamera>

      <BackDirectionalLight />
      <hemisphereLight
        args={[new Color("#ffffff"), new Color("#ffffff"), 0.6]}
      />
      <LanesView />
      <GameController />
    </>
  );
};

export default SceneDefaultView;
