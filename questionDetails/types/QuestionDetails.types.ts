export interface StoredAnswer {
  id: string;
  questionId: string;
  answer: string;
  timestamp: number;
  question: string;
}

export interface Question {
  id: string;
  text: string;
  createdAt: Date;
}

export interface FavoriteQuestion {
  id: string;
  questionId: string;
  createdAt: Date;
}
export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
