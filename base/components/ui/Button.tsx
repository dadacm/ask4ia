import { ThemedText } from '@/base/components/ThemedText';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { IconSymbol } from './IconSymbol';

export type ButtonVariant = 'primary' | 'secondary' | 'icon-only';

export type ButtonProps = TouchableOpacityProps & {
  title?: string;
  loading?: boolean;
  variant?: ButtonVariant;
  icon?:
    | React.ReactElement
    | {
        name: React.ComponentProps<typeof IconSymbol>['name'];
        size?: number;
      };
};

const variants = {
  base: 'items-center justify-center rounded-lg',
  variants: {
    primary: {
      button: 'px-6 py-3 bg-[#0a7ea4] active:bg-[#086688]',
      text: 'text-white',
      loading: '#fff',
    },
    secondary: {
      button: 'px-6 py-3 bg-gray-200 dark:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600',
      text: 'text-[#0a7ea4] dark:text-white',
      loading: '#0a7ea4',
    },
    'icon-only': {
      button: 'p-3 bg-[#0a7ea4] active:bg-[#086688] self-end',
      text: 'text-white',
      loading: '#fff',
    },
  },
} as const;

export function Button({
  title,
  loading,
  variant = 'primary',
  icon,
  style,
  ...props
}: ButtonProps) {
  const variantStyles = variants.variants[variant];

  return (
    <TouchableOpacity
      className={`${variants.base} ${variantStyles.button}`}
      style={style}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.loading} />
      ) : variant === 'icon-only' && icon ? (
        React.isValidElement(icon) ? (
          icon
        ) : (
          <IconSymbol
            name={(icon as { name: React.ComponentProps<typeof IconSymbol>['name'] }).name}
            size={(icon as { size?: number }).size ?? 24}
            color="#fff"
          />
        )
      ) : (
        <>
          {React.isValidElement(icon) && icon}
          {title && <ThemedText className={variantStyles.text}>{title}</ThemedText>}
        </>
      )}
    </TouchableOpacity>
  );
}
