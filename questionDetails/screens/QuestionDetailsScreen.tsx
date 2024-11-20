import ParallaxScrollView from '@/base/components/ParallaxScrollView';
import { ThemedText } from '@/base/components/ThemedText';
import { ThemedView } from '@/base/components/ThemedView';
import { IconSymbol } from '@/base/components/ui/IconSymbol';
import { useService } from '@/base/hooks/useService';
import { useStorage } from '@/base/hooks/useStorage';
import { NewQuestionInterface } from '@/home/screens/types/HomeScreen.types';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { generateTextFacade } from './Services/facades/generateOpenIAFacade';

export default function QuestionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [question, setQuestion] = useState<NewQuestionInterface | null>(null);
  const { getData } = useStorage<NewQuestionInterface[]>('questions');

  useEffect(() => {
    const fetchQuestion = async () => {
      const questions = (await getData()) || [];
      const foundQuestion = questions.find(q => q.id === id);
      if (foundQuestion) {
        fetchAnswer(foundQuestion.text);
      }
    };

    fetchQuestion();
  }, [id]);

  const {
    execute: fetchAnswer,
    isLoading,
    data: answer,
    error,
  } = useService(generateTextFacade, {
    onSuccess: data => {
      console.log('Answer generated successfully:', data);
    },
    onError: error => {
      console.error('Failed to generate answer:', error);
    },
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="list.bullet"
          style={{ position: 'absolute', bottom: -90, left: -35 }}
        />
      }
    >
      <ThemedView className="flex-1">
        <ThemedView className="flex-row items-center gap-2">
          <ThemedText type="title">Pergunta #{id}</ThemedText>
        </ThemedView>

        {question && (
          <ThemedView className="mt-4">
            <ThemedText className="text-base">{question.text}</ThemedText>
          </ThemedView>
        )}

        {isLoading && <ThemedText>Gerando resposta...</ThemedText>}
        {error && <ThemedText>Erro: {error.message}</ThemedText>}
        {answer && <ThemedText className="text-base">{answer}</ThemedText>}
      </ThemedView>
    </ParallaxScrollView>
  );
}
