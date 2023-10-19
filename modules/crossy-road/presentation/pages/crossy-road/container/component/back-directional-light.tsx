'use client';

import { Color } from 'three';

// REF: set light target https://codesandbox.io/s/volumetric-spotlight-tx1pq?file=/src/App.js:1598-1884
const BackDirectionalLight = () => {
  return (
    <directionalLight
      intensity={0.4}
      color={new Color('#000000')}
      castShadow
      position={[200, 200, 50]}
    />
  );
};

export default BackDirectionalLight;
