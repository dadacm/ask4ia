import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';

export function useStorage<T>(key: string) {
  const [data, setData] = useState<T | null>(null);

  const getData = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue != null) {
        const parsedData = JSON.parse(jsonValue) as T;
        setData(parsedData);
        return parsedData;
      }
      return null;
    } catch (error) {
      console.error('Error getting data from storage:', error);
      return null;
    }
  }, [key]);

  const saveData = useCallback(
    async (value: T) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
        setData(value);
        return true;
      } catch (error) {
        console.error('Error saving data to storage:', error);
        return false;
      }
    },
    [key]
  );

  const removeData = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(key);
      setData(null);
      return true;
    } catch (error) {
      console.error('Error removing data from storage:', error);
      return false;
    }
  }, [key]);

  return {
    data,
    getData,
    saveData,
    removeData,
  };
}
