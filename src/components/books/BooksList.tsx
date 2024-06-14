import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";
import { useEffect, useState } from "react";
import { ViewMode } from "./BooksViewSwitcher";
import { QUERYSTRING } from "../../constants/querystring";
import { useLocation } from "react-router-dom";

interface Props {
  books: Book[];
}

// const dummyBook : Book = {
//     id : 1,
//     title : 'dummy',
//     img : 5,
//     category_id : 1,
//     form : 'paperback',
//     isbn : 'Dummy',
//     summary : 'Dummy',
//     detail : 'Dummy',
//     author : 'Dummy',
//     pages : 100,
//     contents : 'Dummy',
//     price : 10000,
//     likes : 10,
//     pubDate : '2021-10-11',
// }

function BooksList({ books }: Props) {
  const [view, setView] = useState<ViewMode>("grid");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);
  return (
    <BooksListStyle view={view}>
      {books?.map((item) => (
        <BookItem key={item.id} book={item} view={view} />
      ))}
    </BooksListStyle>
  );
}

interface BooksListStyleProps {
  view: ViewMode;
}

//view라는 타입정보를 받아서 사용하기 위해 BooksListStyleProps지정
const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(4,1fr)" : "repeat(1,1fr)"};
  gap: 24px;
`;

export default BooksList;
