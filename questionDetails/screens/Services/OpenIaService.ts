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

  let content = mockResponses.default;
  if (prompt.toLowerCase().includes('olá')) {
    content = mockResponses.greeting;
  }
  if (prompt.toLowerCase().includes('ajuda')) {
    content = mockResponses.help;
  }

  return {
    id: 'chatcmpl-abc123',
    object: 'chat.completion',
    created: 1677858242,
    model: 'gpt-4o-mini',
    usage: {
      prompt_tokens: 13,
      completion_tokens: 7,
      total_tokens: 20,
      completion_tokens_details: {
        reasoning_tokens: 0,
        accepted_prediction_tokens: 0,
        rejected_prediction_tokens: 0,
      },
    },
    choices: [
      {
        message: {
          role: 'assistant',
          content: content,
        },
        logprobs: null,
        finish_reason: 'stop',
        index: 0,
      },
    ],
  };
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
        model: 'gpt-4o-mini-2024-07-18',
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
