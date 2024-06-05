import React from "react";
import { render } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";
import { Book } from "../../models/book.model";

const dummyBook : Book = {
    id : 1,
    title : 'dummy',
    img : 5,
    category_id : 1,
    form : 'paperback',
    isbn : 'Dummy',
    summary : 'Dummy',
    detail : 'Dummy',
    author : 'Dummy',
    pages : 100,
    contents : 'Dummy',
    price : 10000,
    likes : 10,
    pubDate : '2021-10-11', 
}

describe('BookItem', () => {
    it('렌더 여부', () =>{
        const { getByText} = render(
            <BookStoreThemeProvider>
                <BookItem book={dummyBook}/>
            </BookStoreThemeProvider>
        )
        expect(getByText(dummyBook.title)).toBeInTheDocument();
        expect(getByText(dummyBook.summary)).toBeInTheDocument();
        expect(getByText(dummyBook.author)).toBeInTheDocument();
        expect(getByText('10,000원')).toBeInTheDocument();
    });

    
})