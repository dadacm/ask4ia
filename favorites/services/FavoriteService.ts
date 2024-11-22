import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites';

export interface FavoriteQuestion {
  id: string;
  question: string;
  answer: string;
}

export class FavoriteService {
  static async getFavorites(): Promise<FavoriteQuestion[]> {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  static async toggleFavorite(question: FavoriteQuestion): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      const isFavorite = favorites.some(fav => fav.id === question.id);

      let newFavorites;
      if (isFavorite) {
        newFavorites = favorites.filter(fav => fav.id !== question.id);
      } else {
        newFavorites = [...favorites, question];
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return !isFavorite;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }

  static async isFavorite(id: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => fav.id === id);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  }
}
