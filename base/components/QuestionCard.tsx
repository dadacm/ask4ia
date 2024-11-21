import { Image, Text, View } from 'react-native';
import HumanAvatar from '../assets/images/human-avatar.png';
import IaAvatar from '../assets/images/ia-avatar.png';
import { ThemedText } from './ThemedText';
interface QuestionCardProps {
  answer: string;
  isLoading?: boolean;
  error?: Error | null;
  isQuestion?: boolean;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { answer, isLoading, error, isQuestion } = props;

  if (isLoading) {
    return <ThemedText>Gerando resposta...</ThemedText>;
  }

  if (error) {
    return <ThemedText>Erro: {error.message}</ThemedText>;
  }

  return (
    <View className={`flex-row ${!isQuestion ? 'justify-end' : 'justify-start'} gap-2 mt-4`}>
      {isQuestion && (
        <View className="rounded-lg flex-shrink-0">
          <Image
            source={HumanAvatar}
            className="flex size-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
            accessibilityLabel="IA Avatar"
          />
        </View>
      )}
      <View className="bg-gray-400 p-3 rounded-lg">
        <Text className="text-base text-white">{answer}</Text>
      </View>
      {!isQuestion && (
        <View className="rounded-lg flex-shrink-0">
          <Image
            source={IaAvatar}
            className="flex size-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
            accessibilityLabel="IA Avatar"
          />
        </View>
      )}
    </View>
  );
};

export default QuestionCard;
