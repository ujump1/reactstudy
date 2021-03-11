import * as React from "react";

export const themes = {
    light: {
        foreground: '#000000',
        background: 'green',
    },
    dark: {
        foreground: '#ffffff',
        background: 'blue',
    },
};

export const ThemeContext = React.createContext(
    themes.dark // 默认值
);