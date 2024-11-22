import { StoredAnswerService } from '@/questionDetails/services/StoredAnswerService';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { FavoriteService } from '../../favorites/services/FavoriteService';
import { QuestionService } from '../../questionsList/services/QuestionService';
import HumanAvatar from '../assets/images/human-avatar.png';
import IaAvatar from '../assets/images/ia-avatar.png';
import { ThemedText } from './ThemedText';
import { Button } from './ui/Button';
import { IconSymbol } from './ui/IconSymbol';

interface QuestionCardProps {
  answer: string;
  question?: string;
  isLoading?: boolean;
  error?: Error | null;
  isQuestion?: boolean;
  isListCard?: boolean;
  onDelete?: () => void;
  onFavorite?: () => void;
  id: string;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { answer, question, isLoading, error, isQuestion, isListCard, onDelete, id, onFavorite } =
    props;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorite = await FavoriteService.isFavorite(id);
      setIsFavorite(favorite);
    };

    checkFavorite();
  }, [id]);

  const handleFavoritePress = useCallback(async () => {
    const newFavoriteStatus = await FavoriteService.toggleFavorite({
      id,
      question: question || '',
      answer,
    });
    setIsFavorite(newFavoriteStatus);
    onFavorite?.();
  }, [id, question, answer]);

  const handleQuestionPress = (questionId: string) => () => {
    router.push(
      `/questionDetails/${encodeURIComponent(questionId)}?question=${encodeURIComponent(question || '')}`
    );
  };

  const handleDelete = useCallback(async () => {
    try {
      const deleted = await QuestionService.deleteQuestion(id);
      if (deleted) {
        await StoredAnswerService.deleteAnswer(id);

        if (isFavorite) {
          await FavoriteService.toggleFavorite({
            id,
            question: question || '',
            answer,
          });
        }
        onDelete?.();
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  }, [id, isFavorite]);

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
      <View>
        <View className="bg-gray-400 p-3 max-w-[270px] rounded-lg">
          <Text className="text-base text-white">{answer}</Text>
        </View>
        {isListCard && (
          <View className="flex-row gap-2 mt-2">
            <Button variant="secondary" onPress={handleQuestionPress(id)} title="Ver detalhes" />
            <Button
              variant="secondary"
              onPress={handleFavoritePress}
              icon={<IconSymbol name={isFavorite ? 'star.fill' : 'star'} size={20} color="#FFF" />}
            />
            <Button
              variant="secondary"
              onPress={handleDelete}
              icon={<IconSymbol name="trash" size={20} color="#FFF" />}
            />
          </View>
        )}
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
