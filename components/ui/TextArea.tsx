import { TextInput, TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type TextAreaProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  minHeight?: number;
};

export function TextArea({ 
  style, 
  lightColor, 
  darkColor, 
  minHeight = 100,
  ...props 
}: TextAreaProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: '#E8E8E8', dark: '#262626' }, 'background');

  return (
    <TextInput
      className="w-full px-4 py-3 rounded-lg"
      multiline
      textAlignVertical="top"
      style={[
        { 
          color, 
          backgroundColor,
          minHeight,
        }, 
        style
      ]}
      placeholderTextColor={color + '80'}
      {...props}
    />
  );
} 