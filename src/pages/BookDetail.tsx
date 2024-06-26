import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useBook } from "../hooks/useBook";
import { getImgSrc } from "../utils/image";
import Title from "../components/common/Title";
import { BookDetail as IBookDetail } from "../models/book.model";
import { formatDate, formatNumber } from "../utils/format";
import { Link } from "react-router-dom";
import EllipsisBox from "../components/common/EllipsisBox";
import LikeButton from "../components/book/LikeButton";
import AddToCart from "../components/book/AddToCart";
import BookReview from "@/components/book/BookReview";
import { Tab, Tabs } from "@/components/common/Tabs";

function BookDetail() {
  const bookInfoList = [
    {
      label: "카테고리",
      key: "categoryName",
      filter: (book: IBookDetail) => (
        <Link to={`/books?category_id=${book.category_id}`}>
          {changeToName(book.category_id)}
        </Link>
      ),
    },
    {
      label: "포맷",
      key: "form",
    },
    {
      label: "페이지",
      key: "pages",
    },
    {
      label: "ISBN",
      key: "isbn",
    },
    {
      label: "출간일",
      key: "pubDate",
      filter: (book: IBookDetail) => {
        return formatDate(book.pubDate);
      },
    },
    //각 라벨마다 렌더링설정이 다르기 때문에 filter속성으로 관리한다
    {
      label: "가격",
      key: "price",
      filter: (book: IBookDetail) => {
        return `${formatNumber(book.price)} 원`;
      },
    },
  ];

  //주소에서 가져옴
  const { bookId } = useParams();
  const { book, likeToggle, changeToName, reviews, addReview } =
    useBook(bookId);

  //book이 null값일 수 있기때문에 객체 값을 사용못하는 경우가 있다
  //-> 얼리 return으로 해결 (null인 경우를 미리 대비한다)
  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map((item) => (
            <dl>
              <dt>{item.label}</dt>
              <dd>
                {item.filter
                  ? item.filter(book)
                  : book[item.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>

          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>

          <AddToCart book={book} />
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="상세설명">
            <Title size="medium">상세설명</Title>
            <EllipsisBox lineLimit={4}>{book.detail}</EllipsisBox>
          </Tab>
          <Tab title="목차">
            <Title size="medium">목차</Title>
            <p className="index">{book.contents}</p>
          </Tab>
          <Tab title="리뷰">
            <Title size="medium">리뷰</Title>
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }
        a {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }

  .content {
  }
`;

export default BookDetail;
