export type Answer = 'A' | 'B' | 'C' | 'D';

export type Question =  {
  id: string
  question: string
  answer: string
  choices: Choices
}

type Choices = {
  A: string
  B: string
  C: string
  D: string
}