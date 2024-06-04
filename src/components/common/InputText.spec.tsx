import {render, screen} from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import InputText from './InputText';
import React from 'react';


describe('Input 컴포넌트 테스트', () => {
    it('렌더를 확인' , () => {
        //렌더
        render(
            <BookStoreThemeProvider>
                <InputText placeholder='입력'/>
            </BookStoreThemeProvider>
        )
        //확인
        expect(screen.getByPlaceholderText('입력')).toBeInTheDocument();
    })
    it('forwardRef 테스트',() => { 
        const ref = React.createRef<HTMLInputElement>();
        render(
            <BookStoreThemeProvider>
                <InputText placeholder='입력' ref={ref}/>
            </BookStoreThemeProvider>
        );
        //ref가 Inputelement가 맞는지 확인
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
    
    
})