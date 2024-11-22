import ParallaxScrollView from '@/base/components/ParallaxScrollView';
import QuestionCard from '@/base/components/QuestionCard';
import { ThemedText } from '@/base/components/ThemedText';
import { ThemedView } from '@/base/components/ThemedView';
import { IconSymbol } from '@/base/components/ui/IconSymbol';
import { useService } from '@/base/hooks/useService';
import { useStorage } from '@/base/hooks/useStorage';
import { NewQuestionInterface } from '@/home/screens/types/HomeScreen.types';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStoredAnswers } from '../hooks/useStoredAnswers';
import { generateTextFacade } from '../Services/facades/generateOpenIAFacade';
import { StoredAnswer, Usage } from '../types/QuestionDetails.types';

export default function QuestionDetailsScreen() {
  const { id, question } = useLocalSearchParams<{ id: string; question: string }>();
  const [savedAnswer, setSavedAnswer] = useState<string | null>(null);
  const { getData: getQuestions } = useStorage<NewQuestionInterface[]>('questions');
  const { getAnswerById, saveAnswer } = useStoredAnswers();
  const isLoadingRef = useRef(false);

  const handleSaveAnswer = async (answer: string) => {
    const newStoredAnswer: StoredAnswer = {
      id: id,
      questionId: id,
      question: question || '',
      answer: answer,
      timestamp: Date.now(),
    };

    const success = await saveAnswer(newStoredAnswer);
    if (success) {
      const existingAnswer = await getAnswerById(id);
      setSavedAnswer(answer);
    }
    return success;
  };

  const {
    execute: fetchAnswer,
    isLoading,
    data: generatedAnswer,
    error,
  } = useService(
    generateTextFacade as (params: string) => Promise<{ response: string; usage: Usage }>,
    {
      onSuccess: async (data: { response: string; usage: Usage }) => {
        await handleSaveAnswer(data.response);
      },
      onError: error => {
        console.error('Failed to generate answer:', error);
      },
    }
  );

  const loadQuestionAndAnswer = async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      // Carrega a pergunta primeiro
      const questions = await getQuestions();
      const foundQuestion = questions?.find(q => q.id === id);
      if (!foundQuestion) {
        isLoadingRef.current = false;
        return;
      }

      // Verifica se já existe uma resposta salva
      const existingAnswer = await getAnswerById(id);

      if (existingAnswer) {
        setSavedAnswer(existingAnswer.answer);
      } else {
        // Só gera nova resposta se não existir uma salva
        await fetchAnswer(foundQuestion.text);
      }
    } catch (error) {
      console.error('Error loading question and answer:', error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    loadQuestionAndAnswer();
  }, []);

  const displayAnswer = savedAnswer || generatedAnswer?.response;
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    setIsOpen(index >= 0);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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

          {question && <QuestionCard isQuestion={true} answer={question} id={id} />}

          {displayAnswer && (
            <QuestionCard isLoading={isLoading} error={error} answer={displayAnswer} id={id} />
          )}
        </ThemedView>
      </ParallaxScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        {generatedAnswer?.usage && (
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.itemContainer}>
              <Text>Tokens usados no prompt</Text>
              <Text>{generatedAnswer?.usage.prompt_tokens}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text>Tokens usados na resposta</Text>
              <Text>{generatedAnswer?.usage.completion_tokens}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text>Tokens usados no total</Text>
              <Text>{generatedAnswer?.usage.total_tokens}</Text>
            </View>
          </BottomSheetView>
        )}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    gap: 10,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
