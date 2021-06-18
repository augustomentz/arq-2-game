export type Question = {
  id: number;
  question: string;
  options: QuestionOption[];
  answer: string;
  number: number;
};

type QuestionOption = {
  label: string;
  value: string;
};
