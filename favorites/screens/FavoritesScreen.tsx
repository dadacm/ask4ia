import { mainStyles } from '@/base/components/ParallaxScrollView';
import QuestionCard from '@/base/components/QuestionCard';
import { ThemedText } from '@/base/components/ThemedText';
import { ThemedView } from '@/base/components/ThemedView';
import { IconSymbol } from '@/base/components/ui/IconSymbol';
import { FavoriteQuestion, FavoriteService } from '@/favorites/services/FavoriteService';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<FavoriteQuestion[]>([]);
  const scrollOffset = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.FlatList<FavoriteQuestion>>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const loadFavorites = async () => {
    const storedFavorites = await FavoriteService.getFavorites();
    setFavorites(storedFavorites);
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const renderFavorite = useCallback(
    ({ item }: { item: FavoriteQuestion }) => (
      <QuestionCard
        onFavorite={() => loadFavorites()}
        onDelete={() => loadFavorites()}
        isListCard
        isQuestion
        answer={item.answer}
        question={item.question}
        id={item.id}
      />
    ),
    []
  );

  const keyExtractor = useCallback((item: FavoriteQuestion) => item.id, []);

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
        <IconSymbol
          size={310}
          color="#808080"
          name="star.fill"
          style={{ position: 'absolute', bottom: -90, left: -35 }}
        />
      </View>
      <ThemedView className="flex-1">
        {favorites.length === 0 ? (
          <ThemedText className="text-center mt-4">
            Nenhuma pergunta favorita encontrada.
          </ThemedText>
        ) : (
          <Animated.FlatList
            ListHeaderComponent={
              <>
                <ThemedText type="title">Favoritos</ThemedText>
                <ThemedText className="text-base mb-6">Suas perguntas favoritas.</ThemedText>
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
            data={favorites}
            renderItem={renderFavorite}
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
