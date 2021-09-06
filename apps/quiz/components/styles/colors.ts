/* Color palette */

export const colors = {
  titleOrange: '#f1a82a',
  titleYellow: '#faeb0c',
  titlePurple: '#41308b',
} as const;

export type Colors = typeof colors[keyof typeof colors]; 
