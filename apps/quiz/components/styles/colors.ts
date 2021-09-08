/* Color palette */

export const colors = {
  titleOrange: '#f1a82a',
  titleYellow: '#faeb0c',
  titlePurple: '#41308b',
  circleRed: 'linear-gradient(rgb(255, 119, 119), red)',
  circleBlue: 'linear-gradient(rgb(0, 110, 255), blue)',
  circleYellow: 'linear-gradient(rgb(255, 255, 255), yellow)',
  circleGreen: 'linear-gradient(rgb(197, 255, 197), rgb(32, 150, 32))'
} as const;

export type Colors = typeof colors[keyof typeof colors]; 
