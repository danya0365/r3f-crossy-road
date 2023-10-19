"use client";

import { COLUMNS } from "../../../../../domain/constant/constant";
import { LaneHelper } from "../../../../../domain/helper/helper";
import {
  currentColumnState,
  currentLaneState,
  isReadyState,
  lanesState,
  movesState,
  startMovingState,
  stepStartTimestampState,
} from "../../../../../domain/state/shared-state";
import { GameControls, MoveDirection } from "../../../../../domain/type";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const GameController = () => {
  const [subscribeControls, getControls] = useKeyboardControls<GameControls>();
  const [isReady, setIsReady] = useRecoilState(isReadyState);
  const [startMoving, setStartMoving] = useRecoilState(startMovingState);
  const [moves, setMoves] = useRecoilState(movesState);
  const [lanes, setLanes] = useRecoilState(lanesState);
  const [currentLane, setCurrentLane] = useRecoilState(currentLaneState);
  const [currentColumn, setCurrentColumn] = useRecoilState(currentColumnState);
  const [stepStartTimestamp, setStepStartTimestamp] = useRecoilState(
    stepStartTimestampState
  );

  const addNewLaneIfNeeded = (moveToLaneNumber: number) => {
    setLanes((oldLanes) => {
      const newLaneNumber = moveToLaneNumber + 10;
      const isLaneExist = oldLanes.find(
        (oldLane) => oldLane.laneNumber === newLaneNumber
      );
      if (isLaneExist) {
        return [...oldLanes];
      }
      const id = oldLanes.at(-1)?.laneNumber
        ? oldLanes.at(-1)!.laneNumber + 1
        : 1;
      return [...oldLanes, LaneHelper.createLane(id)];
    });
  };

  const moveChicken = (direction: MoveDirection) => {
    if (!isReady) {
      return;
    }
    const finalPositions = moves.reduce(
      (position, move) => {
        if (move === "forward")
          return {
            laneNumber: position.laneNumber + 1,
            columnNumber: position.columnNumber,
          };
        if (move === "backward")
          return {
            laneNumber: position.laneNumber - 1,
            columnNumber: position.columnNumber,
          };
        if (move === "left")
          return {
            laneNumber: position.laneNumber,
            columnNumber: position.columnNumber - 1,
          };
        if (move === "right")
          return {
            laneNumber: position.laneNumber,
            columnNumber: position.columnNumber + 1,
          };
      },
      { laneNumber: currentLane, columnNumber: currentColumn } as any
    );

    if (direction === "forward") {
      const lane = lanes.find(
        (val) => val.laneNumber === finalPositions.laneNumber + 1
      );
      if (!lane) {
        return;
      }
      if (
        lane.type === "forest" &&
        lane.occupies.find(
          (val) => val.position === finalPositions.columnNumber
        )
      ) {
        return;
      }
      if (!stepStartTimestamp) setStartMoving(true);
      addNewLaneIfNeeded(lane.laneNumber);
    } else if (direction === "backward") {
      const lane = lanes.find(
        (val) => val.laneNumber === finalPositions.laneNumber - 1
      );
      if (!lane) {
        return;
      }
      if (lane.laneNumber < 0) {
        return;
      }
      if (
        lane.type === "forest" &&
        lane.occupies.find(
          (val) => val.position === finalPositions.columnNumber
        )
      ) {
        return;
      }
      if (!stepStartTimestamp) setStartMoving(true);
    } else if (direction === "left") {
      if (finalPositions.columnNumber === 0) return;
      const lane = lanes.find(
        (val) => val.laneNumber === finalPositions.laneNumber
      );
      if (!lane) {
        return;
      }
      if (
        lane.type === "forest" &&
        lane.occupies.find(
          (val) => val.position === finalPositions.columnNumber - 1
        )
      ) {
        return;
      }
      if (!stepStartTimestamp) setStartMoving(true);
    } else if (direction === "right") {
      if (finalPositions.columnNumber === COLUMNS - 1) return;
      const lane = lanes.find(
        (val) => val.laneNumber === finalPositions.laneNumber
      );
      if (!lane) {
        return;
      }
      if (
        lane.type === "forest" &&
        lane.occupies.find(
          (val) => val.position === finalPositions.columnNumber + 1
        )
      ) {
        return;
      }
      if (!stepStartTimestamp) setStartMoving(true);
    }
    setMoves((prev) => [...prev, direction]);
  };

  useEffect(() => {
    const forwardUnsubscribe = subscribeControls(
      (state) => state.forward,
      (pressed) => {
        console.log("forward", pressed);
        if (pressed) {
          moveChicken("forward");
        }
      }
    );
    const backUnsubscribe = subscribeControls(
      (state) => state.back,
      (pressed) => {
        console.log("back", pressed);
        if (pressed) {
          moveChicken("backward");
        }
      }
    );
    const leftUnsubscribe = subscribeControls(
      (state) => state.left,
      (pressed) => {
        console.log("left", pressed);
        if (pressed) {
          moveChicken("left");
        }
      }
    );
    const rightUnsubscribe = subscribeControls(
      (state) => state.right,
      (pressed) => {
        console.log("right", pressed);
        if (pressed) {
          moveChicken("right");
        }
      }
    );
    return () => {
      forwardUnsubscribe();
      backUnsubscribe();
      leftUnsubscribe();
      rightUnsubscribe();
    };
  }, [lanes, moves, currentLane, currentColumn, isReady]);

  useEffect(() => {
    setCurrentLane(0);
    setCurrentColumn(Math.floor(COLUMNS / 2));
    setStartMoving(false);
    setMoves([]);
    setStepStartTimestamp(0);
    setIsReady(true);
  }, []);
  return null;
};

export default GameController;
