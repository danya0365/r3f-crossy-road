"use client";

import { DISTANCE } from "../../../../../domain/constant/constant";
import { DirectionalLightProps } from "@react-three/fiber";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Color, DirectionalLight } from "three";

const MainDirectionalLight = forwardRef<
  DirectionalLight,
  DirectionalLightProps
>((props, outerRef) => {
  const innerRef = useRef<DirectionalLight>(null!);
  useImperativeHandle(outerRef, () => innerRef.current, []);

  return (
    <directionalLight
      ref={innerRef}
      intensity={0.6}
      color={new Color("#ffffff")}
      castShadow
      position={[-150, 100, -700]}
      shadow-mapSize={[2048, 2048]}
      {...props}
    >
      <orthographicCamera
        attach="shadow-camera"
        args={[-DISTANCE, DISTANCE, DISTANCE, -DISTANCE]}
      />
    </directionalLight>
  );
});

export default MainDirectionalLight;
