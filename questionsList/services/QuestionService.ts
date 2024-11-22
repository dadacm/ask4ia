import { NewQuestionInterface } from '@/home/screens/types/HomeScreen.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QUESTIONS_KEY = 'questions';

export class QuestionService {
  static async getQuestions(): Promise<NewQuestionInterface[]> {
    try {
      const questions = await AsyncStorage.getItem(QUESTIONS_KEY);
      return questions ? JSON.parse(questions) : [];
    } catch (error) {
      console.error('Error getting questions:', error);
      return [];
    }
  }

  static async deleteQuestion(id: string): Promise<boolean> {
    try {
      const questions = await this.getQuestions();
      const newQuestions = questions.filter(question => question.id !== id);
      await AsyncStorage.setItem(QUESTIONS_KEY, JSON.stringify(newQuestions));
      return true;
    } catch (error) {
      console.error('Error deleting question:', error);
      return false;
    }
  }
}
