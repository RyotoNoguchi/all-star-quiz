/* Color palette */

export const colors = {
  titleOrange: '#f1a82a',
  titleYellow: '#faeb0c',
  titlePurple: '#41308b',
  circleRed: 'linear-gradient(rgb(255, 119, 119), red)',
  circleBlue: 'linear-gradient(rgb(0, 110, 255), blue)',
  circleYellow: 'linear-gradient(rgb(255, 255, 255), yellow)',
  circleGreen: 'linear-gradient(rgb(197, 255, 197), rgb(32, 150, 32))',
  rankingTitleGold: 'gold',
  rankingTitleBlue: 'rgb(0, 21, 255)',
  answerARed: '#eb3434',
  answerBBlue: '#3446eb',
  answerCYellow: '#ebdc34',
  answerDGreen: '#3ddb35'

} as const;

export const textShadows = {
  rankingTitleBlue: '4px 4px 4px white, -4px -4px 4px white',
  rankingTitleGold: '2px 2px 2px black'
} as const 

export type Colors = typeof colors[keyof typeof colors]; 
export type TextShadows = typeof textShadows[keyof typeof textShadows]