import { useCallback, useState } from 'react';
import { StoredAnswerService } from '../services/StoredAnswerService';
import { StoredAnswer } from '../types/QuestionDetails.types';

export function useStoredAnswers() {
  const [answers, setAnswers] = useState<StoredAnswer[]>([]);

  const getAnswerById = useCallback(async (questionId: string) => {
    return await StoredAnswerService.getAnswerById(questionId);
  }, []);

  const saveAnswer = useCallback(async (answer: StoredAnswer) => {
    return await StoredAnswerService.saveAnswer(answer);
  }, []);

  const deleteAnswer = useCallback(async (questionId: string) => {
    return await StoredAnswerService.deleteAnswer(questionId);
  }, []);

  return {
    answers,
    getAnswerById,
    saveAnswer,
    deleteAnswer,
  };
}
