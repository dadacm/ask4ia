import { mainStyles } from '@/base/components/ParallaxScrollView';
import QuestionCard from '@/base/components/QuestionCard';
import { ThemedText } from '@/base/components/ThemedText';
import { ThemedView } from '@/base/components/ThemedView';
import { IconSymbol } from '@/base/components/ui/IconSymbol';
import { useStorage } from '@/base/hooks/useStorage';
import { NewQuestionInterface } from '@/home/screens/types/HomeScreen.types';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export default function QuestionsScreen() {
  const [questions, setQuestions] = useState<NewQuestionInterface[]>([]);
  const { getData } = useStorage<NewQuestionInterface[]>('questions');
  const scrollOffset = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.FlatList<NewQuestionInterface>>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const loadQuestions = async () => {
    const storedQuestions = await getData();
    if (storedQuestions) {
      const sortedQuestions = storedQuestions.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setQuestions(sortedQuestions);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadQuestions();
    }, [])
  );

  const renderQuestion = useCallback(
    ({ item }: { item: NewQuestionInterface }) => (
      <QuestionCard
        isListCard
        isQuestion
        question={item.text}
        answer={item.text}
        id={item.id}
        key={`${item.id}-${Date.now()}`}
        onFavorite={() => {
          loadQuestions();
        }}
        onDelete={() => {
          loadQuestions();
        }}
      />
    ),
    [loadQuestions]
  );

  const keyExtractor = useCallback((item: NewQuestionInterface) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: 150,
      offset: 150 * index,
      index,
    }),
    []
  );

  return (
    <>
      <View style={[mainStyles.header]}>
        {
          <IconSymbol
            size={310}
            color="#808080"
            name="list.bullet"
            style={{ position: 'absolute', bottom: -90, left: -35 }}
          />
        }
      </View>
      <ThemedView className="flex-1">
        {questions.length === 0 ? (
          <ThemedText className="text-center  mt-4">Nenhuma pergunta encontrada.</ThemedText>
        ) : (
          <Animated.FlatList
            ListHeaderComponent={
              <>
                <ThemedText type="title">Perguntas</ThemedText>
                <ThemedText className="text-base mb-6">
                  Navegue por todas as perguntas disponíveis.
                </ThemedText>
              </>
            }
            contentContainerStyle={{ paddingHorizontal: 32, gap: 16 }}
            ListHeaderComponentStyle={{ marginTop: 32 }}
            ref={scrollRef}
            onScroll={scrollHandler}
            initialNumToRender={5}
            maxToRenderPerBatch={3}
            windowSize={5}
            removeClippedSubviews={true}
            data={questions}
            renderItem={renderQuestion}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            getItemLayout={getItemLayout}
            updateCellsBatchingPeriod={50}
          />
        )}
      </ThemedView>
    </>
  );
}
