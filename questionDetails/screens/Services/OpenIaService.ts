// OpenAIService.js
import { ENV } from '@/base/config/env';
import axios from 'axios';

const openAI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ENV.OPENAI_API_KEY}`,
  },
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateMockResponse = async (prompt: string) => {
  await delay(1000);

  const mockResponses = {
    default: 'Esta é uma resposta mock padrão para teste.',
    greeting: 'Olá! Esta é uma resposta mock para saudações.',
    help: 'Como posso ajudar? Esta é uma resposta mock para pedidos de ajuda.',
  };

  if (prompt.toLowerCase().includes('olá')) {
    return mockResponses.greeting;
  }
  if (prompt.toLowerCase().includes('ajuda')) {
    return mockResponses.help;
  }

  return mockResponses.default;
};

export const generateOpenAIText = async (prompt: string) => {
  const maxRetries = 3;
  const baseDelay = 20000; // 20 segundos de espera base
  console.log('prompt', prompt);

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        const waitTime = baseDelay * attempt;
        console.log(`Aguardando ${waitTime / 1000} segundos antes da tentativa ${attempt + 1}...`);
        await delay(waitTime);
      }

      const response = await openAI.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      });

      return response.data.choices[0].message.content;
    } catch (error: any) {
      if (error?.response?.status === 429) {
        console.log(`Rate limit atingido (429) - Tentativa ${attempt + 1}/${maxRetries}`);

        if (attempt === maxRetries - 1) {
          throw new Error(
            'Limite máximo de tentativas atingido. Por favor, tente novamente mais tarde.'
          );
        }
        continue;
      }

      // Para outros tipos de erro, lança imediatamente
      console.error('Erro na API:', error?.response?.status, error?.response?.data);
      throw error;
    }
  }
};

// Função principal que decide qual implementação usar
