import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TextArea } from '@/components/ui/TextArea';
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
      setQuestion('');
    }, 1000);
  };

  return (
    <ParallaxScrollView
      className="flex-1 bg-red-500"
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
      <View className="flex-1 bg-blue-500">
        <ThemedView className="flex-row items-center gap-2">
          <ThemedText type="title">Início</ThemedText>
        </ThemedView>
        <ThemedText className="text-base">Faça suas perguntas aqui.</ThemedText>

        <View className=" flex-1 bg-red-500">
          <View className="flex-row flex-1 self-end items-end gap-4 bg-black">
            <TextArea
              className="flex-1"
              placeholder="Pergunte aqui..."
              value={question}
              onChangeText={setQuestion}
              minHeight={120}
            />
            <Button
              variant="icon-only"
              title="Send"
              icon={{ name: 'arrow.up.circle.fill', size: 20 }}
              onPress={handleSubmit}
              loading={loading}
              disabled={!question.trim()}
            />
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}
