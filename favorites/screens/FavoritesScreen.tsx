import ParallaxScrollView from '@/base/components/ParallaxScrollView';
import { ThemedText } from '@/base/components/ThemedText';
import { ThemedView } from '@/base/components/ThemedView';
import { IconSymbol } from '@/base/components/ui/IconSymbol';

export default function FavoritesScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="star.fill"
          style={{ position: 'absolute', bottom: -90, left: -35 }}
        />
      }
    >
      <ThemedView className="flex-row items-center gap-2">
        <ThemedText type="title">Favoritos</ThemedText>
      </ThemedView>
      <ThemedText className="text-base">Suas perguntas favoritas aparecerão aqui.</ThemedText>
    </ParallaxScrollView>
  );
}
