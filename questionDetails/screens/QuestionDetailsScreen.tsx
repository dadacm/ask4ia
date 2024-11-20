import ParallaxScrollView from '@/base/components/ParallaxScrollView';
import { ThemedText } from '@/base/components/ThemedText';
import { ThemedView } from '@/base/components/ThemedView';
import { IconSymbol } from '@/base/components/ui/IconSymbol';
import { useLocalSearchParams } from 'expo-router';

export default function QuestionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

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

        <ThemedText className="text-base">
          Aqui você verá os detalhes da pergunta selecionada.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
