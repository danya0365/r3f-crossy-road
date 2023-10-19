"use client";

import { GENERATE_LANES } from "../../../../../domain/constant/constant";
import { LaneHelper } from "../../../../../domain/helper/helper";
import {
  currentLaneState,
  lanesState,
} from "../../../../../domain/state/shared-state";
import { Lane } from "../../../../../domain/type";
import ForestView from "./forest-view";
import GrassView from "./grass-view";
import RoadView from "./road-view";
import React, { useLayoutEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const LanesView = () => {
  const currentLane = useRecoilValue(currentLaneState);
  const [lanes, setLanes] = useRecoilState(lanesState);

  useLayoutEffect(() => {
    const defaultLanes: Lane[] = GENERATE_LANES.map((index) =>
      LaneHelper.createLane(index)
    );
    setLanes(defaultLanes);
  }, []);

  const activeLanes = useMemo(() => {
    const size = 10;
    const startLane = currentLane - size;
    const endLane = currentLane + size;
    return lanes.filter(
      (val) => val.laneNumber >= startLane && val.laneNumber <= endLane
    );
  }, [lanes, currentLane]);

  if (activeLanes.length === 0) {
    return null;
  }

  return activeLanes.map((lane) => {
    switch (lane.type) {
      case "field": {
        return <GrassView key={`lanes-${lane.laneNumber}`} lane={lane} />;
      }
      case "forest": {
        return <ForestView key={`lanes-${lane.laneNumber}`} lane={lane} />;
      }
      case "road": {
        return <RoadView key={`lanes-${lane.laneNumber}`} lane={lane} />;
      }
    }
  });
};

export default LanesView;
