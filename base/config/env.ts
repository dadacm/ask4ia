import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra;

export const ENV = {
  OPENAI_API_KEY: extra?.OPENAI_API_KEY as string,
  IS_MOCK: extra?.IS_MOCK as string,
};
