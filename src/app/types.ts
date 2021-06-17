export type Question = {
  id: number;
  question: string;
  options: QuestionOption[];
  answer: string;
};

type QuestionOption = {
  label: string;
  value: string;
};
