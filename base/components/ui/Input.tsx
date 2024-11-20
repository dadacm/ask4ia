import { useThemeColor } from '@/base/hooks/useThemeColor';
import { TextInput, TextInputProps } from 'react-native';

export type InputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Input({ style, lightColor, darkColor, ...props }: InputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: '#E8E8E8', dark: '#262626' }, 'background');

  return (
    <TextInput
      className="w-full px-4 py-3 rounded-lg"
      placeholderTextColor={color + '80'}
      style={[{ color, backgroundColor }, style]}
      {...props}
    />
  );
}
