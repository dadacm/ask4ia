import { ENV } from '@/base/config/env';
import { generateMockResponse, generateOpenAIText } from '../OpenIaService';

export const generateTextFacade =
  ENV.IS_MOCK === 'true' ? generateMockResponse : generateOpenAIText;
