// MARK: camera setting https://observablehq.com/@grantcuster/understanding-scale-and-the-three-js-perspective-camera
// MARK: https://stackoverflow.com/questions/57959190/three-js-update-the-fov-value-of-a-perspective-camera-and-keep-the-same-camera-d
export const DISTANCE = 500;
export const ROTATE_X = (50 * Math.PI) / 180;
export const ROTATE_Y = (20 * Math.PI) / 180;
export const ROTATE_Z = (10 * Math.PI) / 180;
export const INITIAL_CAMERA_POSITION_Y = -Math.tan(ROTATE_X) * DISTANCE;
export const INITIAL_CAMERA_POSITION_X =
  Math.tan(ROTATE_Y) *
  Math.sqrt(DISTANCE ** 2 + INITIAL_CAMERA_POSITION_Y ** 2);
export const INITIAL_CAMERA_POSITION_Z = DISTANCE;
