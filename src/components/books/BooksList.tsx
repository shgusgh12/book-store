import styled from 'styled-components'
import BookItem from './BookItem';
import { Book } from '../../models/book.model';

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

function BooksList() {
    return(
        <BooksListStyle>
            <BookItem book={dummyBook}/>
        </BooksListStyle>
    )
}

const BooksListStyle = styled.div``

export default BooksList