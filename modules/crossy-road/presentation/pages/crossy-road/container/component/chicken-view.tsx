'use client';

import {
  BOARD_WIDTH,
  CHICKEN_SIZE,
  INITIAL_CAMERA_POSITION_X,
  INITIAL_CAMERA_POSITION_Y,
  POSITION_WIDTH,
  STEP_TIME,
  ZOOM
} from '../constant';
import {
  currentColumnState,
  currentLaneState,
  movesState,
  startMovingState,
  stepStartTimestampState
} from '../shared-state';
import { useFrame, useThree } from '@react-three/fiber';
import moment from 'moment';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Color, Group } from 'three';

const ChickenView = forwardRef<Group, any>((_, outerRef) => {
  const innerRef = useRef<Group>(null!);
  useImperativeHandle(outerRef, () => innerRef.current, []);
  const [startMoving, setStartMoving] = useRecoilState(startMovingState);
  const [moves, setMoves] = useRecoilState(movesState);
  const [currentLane, setCurrentLane] = useRecoilState(currentLaneState);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnState);
  const [stepStartTimestamp, setStepStartTimestamp] = useRecoilState(
    stepStartTimestampState
  );
  const camera = useThree((state) => state.camera);

  useFrame((state, delta, xrFrame) => {
    const timestamp = moment().toDate().getTime();
    if (startMoving) {
      setStepStartTimestamp(timestamp);
      setStartMoving(false);
    }

    if (stepStartTimestamp) {
      const moveDeltaTime = timestamp - stepStartTimestamp;
      const moveDeltaDistance =
        Math.min(moveDeltaTime / STEP_TIME, 1) * POSITION_WIDTH * ZOOM;
      const jumpDeltaDistance =
        Math.sin(Math.min(moveDeltaTime / STEP_TIME, 1) * Math.PI) * 8 * ZOOM;
      switch (moves[0]) {
        case 'forward': {
          const positionY =
            currentLane * POSITION_WIDTH * ZOOM + moveDeltaDistance;
          camera.position.y = INITIAL_CAMERA_POSITION_Y + positionY;
          if (innerRef) {
            const chickenRefAlias = innerRef as React.MutableRefObject<Group>;
            chickenRefAlias.current.position.y = positionY;
            chickenRefAlias.current.position.z = jumpDeltaDistance;
          }

          break;
        }
        case 'backward': {
          const positionY =
            currentLane * POSITION_WIDTH * ZOOM - moveDeltaDistance;
          camera.position.y = INITIAL_CAMERA_POSITION_Y + positionY;
          if (innerRef) {
            const chickenRefAlias = innerRef as React.MutableRefObject<Group>;
            chickenRefAlias.current.position.y = positionY;
            chickenRefAlias.current.position.z = jumpDeltaDistance;
          }
          break;
        }
        case 'left': {
          const positionX =
            (currentColumn * POSITION_WIDTH + POSITION_WIDTH / 2) * ZOOM -
            (BOARD_WIDTH * ZOOM) / 2 -
            moveDeltaDistance;
          camera.position.x = INITIAL_CAMERA_POSITION_X + positionX;
          if (innerRef) {
            const chickenRefAlias = innerRef as React.MutableRefObject<Group>;
            chickenRefAlias.current.position.x = positionX;
            chickenRefAlias.current.position.z = jumpDeltaDistance;
          }
          break;
        }
        case 'right': {
          const positionX =
            (currentColumn * POSITION_WIDTH + POSITION_WIDTH / 2) * ZOOM -
            (BOARD_WIDTH * ZOOM) / 2 +
            moveDeltaDistance;
          camera.position.x = INITIAL_CAMERA_POSITION_X + positionX;
          if (innerRef) {
            const chickenRefAlias = innerRef as React.MutableRefObject<Group>;
            chickenRefAlias.current.position.x = positionX;
            chickenRefAlias.current.position.z = jumpDeltaDistance;
          }
          break;
        }
      }

      // Once a step has ended
      if (moveDeltaTime > STEP_TIME) {
        switch (moves[0]) {
          case 'forward': {
            setCurrentLane((prev) => prev + 1);
            break;
          }
          case 'backward': {
            setCurrentLane((prev) => prev - 1);
            break;
          }
          case 'left': {
            setCurrentColumn((prev) => prev - 1);
            break;
          }
          case 'right': {
            setCurrentColumn((prev) => prev + 1);
            break;
          }
        }
        const newMoves = [...moves];
        newMoves.shift();
        setMoves(newMoves);
        // If more steps are to be taken then restart counter otherwise stop stepping
        setStepStartTimestamp(moves.length === 0 ? 0 : timestamp);
      }
    }
  });

  return (
    <group ref={innerRef}>
      <mesh position={[0, 0, 10 * ZOOM]} castShadow receiveShadow>
        <boxGeometry
          attach="geometry"
          args={[CHICKEN_SIZE * ZOOM, CHICKEN_SIZE * ZOOM, 20 * ZOOM]}
        />
        <meshPhongMaterial
          attach="material"
          color={new Color('#ffffff')}
          flatShading
        />
      </mesh>
      <mesh position={[0, 0, 21 * ZOOM]} castShadow>
        <boxGeometry attach="geometry" args={[2 * ZOOM, 4 * ZOOM, 2 * ZOOM]} />
        <meshLambertMaterial
          attach="material"
          color={new Color('#f0619a')}
          flatShading
        />
      </mesh>
    </group>
  );
});

export default ChickenView;
