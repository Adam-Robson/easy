
export type ThemeType = 'light' | 'dark' | 'system';

export type ThemeContextType = {
  theme: ThemeType;
  resolvedTheme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}
