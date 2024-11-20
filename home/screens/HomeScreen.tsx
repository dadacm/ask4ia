import ParallaxScrollView from '@/base/components/ParallaxScrollView';
import { ThemedText } from '@/base/components/ThemedText';
import { ThemedView } from '@/base/components/ThemedView';
import { Button } from '@/base/components/ui/Button';
import { IconSymbol } from '@/base/components/ui/IconSymbol';
import { TextArea } from '@/base/components/ui/TextArea';
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!question.trim()) return;
    setLoading(true);
    // Aqui você pode adicionar a lógica para enviar a pergunta
    setTimeout(() => {
      setLoading(false);
      router.push(`/questionDetails/${encodeURIComponent('id123')}`);
      setQuestion('');
    }, 1000);
  };

  return (
    <ParallaxScrollView
      className="flex-1"
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="house.fill"
          style={{ position: 'absolute', bottom: -90, left: -35 }}
        />
      }
    >
      <ThemedView className="flex-1 ">
        <ThemedView className="flex-row items-center gap-2">
          <ThemedText type="title">Início</ThemedText>
        </ThemedView>
        <ThemedText className="text-base">Faça suas perguntas aqui.</ThemedText>

        <View className="flex-1 justify-end">
          <View className="flex-row items-end gap-4">
            <TextArea
              className="flex-1"
              placeholder="Pergunte aqui..."
              value={question}
              onChangeText={setQuestion}
              minHeight={120}
            />
            <Button
              variant="icon-only"
              title="Enviar"
              icon={{ name: 'arrow.up.circle.fill', size: 20 }}
              onPress={handleSubmit}
              loading={loading}
              disabled={!question.trim()}
            />
          </View>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}
