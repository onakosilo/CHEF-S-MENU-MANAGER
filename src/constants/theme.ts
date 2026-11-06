import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#26352D',
    background: '#F7F8F3',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E5EDE5',
    textSecondary: '#78847A',

    primary: '#315C43',
    secondary: '#D9E6D9',
    accent: '#C5A66B',
    danger: '#C64C4C',
    border: '#E2E8DF',
  },

  dark: {
    text: '#F1F5EF',
    background: '#17251C',
    backgroundElement: '#26372B',
    backgroundSelected: '#354B3B',
    textSecondary: '#B0BEB1',

    primary: '#83B994',
    secondary: '#354B3B',
    accent: '#D7B978',
    danger: '#F07878',
    border: '#435447',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light &
  keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },

  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },

  web: {
    sans: 'Arial',
    serif: 'Georgia',
    rounded: 'Arial',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({
  ios: 50,
  android: 80,
}) ?? 0;

export const MaxContentWidth = 800;