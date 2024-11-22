import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoredAnswer } from '../types/QuestionDetails.types';

const ANSWERS_KEY = 'answers';

export class StoredAnswerService {
  static async getAnswers(): Promise<StoredAnswer[]> {
    try {
      const answers = await AsyncStorage.getItem(ANSWERS_KEY);
      return answers ? JSON.parse(answers) : [];
    } catch (error) {
      console.error('Error getting answers:', error);
      return [];
    }
  }

  static async getAnswerById(questionId: string): Promise<StoredAnswer | null> {
    try {
      const answers = await this.getAnswers();
      return answers.find(answer => answer.questionId === questionId) || null;
    } catch (error) {
      console.error('Error getting answer by id:', error);
      return null;
    }
  }

  static async saveAnswer(answer: StoredAnswer): Promise<boolean> {
    try {
      const answers = await this.getAnswers();
      const existingIndex = answers.findIndex(a => a.questionId === answer.questionId);

      const newAnswers =
        existingIndex >= 0
          ? answers.map((a, index) => (index === existingIndex ? answer : a))
          : [...answers, answer];

      await AsyncStorage.setItem(ANSWERS_KEY, JSON.stringify(newAnswers));
      return true;
    } catch (error) {
      console.error('Error saving answer:', error);
      return false;
    }
  }

  static async deleteAnswer(questionId: string): Promise<boolean> {
    try {
      const answers = await this.getAnswers();
      const newAnswers = answers.filter(answer => answer.questionId !== questionId);
      await AsyncStorage.setItem(ANSWERS_KEY, JSON.stringify(newAnswers));
      return true;
    } catch (error) {
      console.error('Error deleting answer:', error);
      return false;
    }
  }
}
