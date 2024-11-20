import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        headerBackTitle: 'Voltar',
        headerBlurEffect: 'systemChromeMaterial',
        presentation: 'modal',
      }}
    />
  );
}
