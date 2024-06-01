export type ThemeName = "light" | "dark";
type Colorkey = "primary" | "background" | "secondary" | "third";

interface Theme{
    name : string;
    color : Record<Colorkey, string>;
}

export const light: Theme = {
    name : 'light',
    color : {
        primary : 'brown',
        background : 'lightgray',
        secondary : 'blue',
        third : 'green'
    }
};

export const dark: Theme = {
    name : 'dark',
    color : {
        primary : 'coral',
        background : 'midnightblue',
        secondary : 'blue',
        third : 'green'
    }
}

export const getTheme = (themeName : ThemeName) : Theme => {
    switch(themeName) {
        case 'light':
            return light;
        case 'dark':
            return dark;
    }
}