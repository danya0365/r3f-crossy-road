export type LaneType = 'field' | 'forest' | 'road';

export type Lane = {
  laneNumber: number;
  type: LaneType;
  occupies: OccupyObject[];
  speed: number;
  direction: boolean;
};

export type MoveDirection = 'forward' | 'backward' | 'left' | 'right';

export type OccupyObjectType = 'tree' | 'car' | 'truck';
export type OccupyObject = {
  id: number;
  position: number;
  height: number;
  type: OccupyObjectType;
  primaryColor: string;
  secondaryColor: string;
};

export enum GameControls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump'
}
