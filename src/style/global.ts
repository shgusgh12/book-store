import 'sanitize.css';
import { createGlobalStyle } from 'styled-components';
import { ThemeName } from './theme';

//ThemeName으로 타입 가드를 두어서 테마가 light, dark이외에는 적용이 되지않게한다
interface Props{
  themeName: ThemeName;
}

export const GlobalStyle = createGlobalStyle<Props>`
    body{
        padding: 0;
        margin: 0;
        background-color: ${(props) => (props.themeName === 'light' ? 'white' : 'black')};
    }
    h1{
        margin: 0;
    }

    *{
        color : ${(props) => (props.themeName === 'light' ? "black" : "white")}
    }
`
