import * as React from 'react';
import { ThemeType } from './type';
export interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}
export declare const ThemeContext: React.Context<ThemeContextType>;
