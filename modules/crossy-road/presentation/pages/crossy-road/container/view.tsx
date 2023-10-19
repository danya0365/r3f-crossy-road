'use client';

import SceneView from './scene/view';
import { GameControls } from './type';
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { RecoilRoot } from 'recoil';
import { Color, PCFSoftShadowMap } from 'three';

const ContainerView = () => {
  const map = useMemo<KeyboardControlsEntry<GameControls>[]>(
    () => [
      { name: GameControls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: GameControls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: GameControls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: GameControls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: GameControls.jump, keys: ['Space'] }
    ],
    []
  );
  return (
    <KeyboardControls map={map}>
      <RecoilRoot>
        <Canvas shadows={{ type: PCFSoftShadowMap, enabled: true }}>
          <color attach="background" args={[new Color('#47B33C')]} />
          <SceneView />
        </Canvas>
      </RecoilRoot>
    </KeyboardControls>
  );
};

export default ContainerView;
