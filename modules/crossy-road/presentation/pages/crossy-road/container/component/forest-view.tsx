'use client';

import { Lane } from '../type';
import GrassView from './grass-view';
import OccupiesView from './occupies-view';

const ForestView = ({ lane }: { lane: Lane }) => {
  return (
    <GrassView lane={lane}>
      <OccupiesView lane={lane} />
    </GrassView>
  );
};

export default ForestView;
