import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unLikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const { isloggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const [cartAdded, setCartAdded] = useState(false);

  const likeToggle = () => {
    //권한 확인 필요 (로그인 안했을때)
    if (!isloggedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }

    if (!book) return;

    if (book.liked) {
      //라이크 상태 -> unlike
      unLikeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1,
        });
      });
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1,
        });
      });
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) return;

    addCart({
      book_id: book.id,
      quantity: quantity,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  const changeToName = (categoryId: number) => {
    if (!book) return;

    switch (categoryId) {
      case 0:
        return "동화";
      case 1:
        return "소설";
      case 2:
        return "사회";
    }
  };
  //fetchbook을 useEffect로 처리
  //bookid가 바뀌면 refetch한다
  useEffect(() => {
    fetchBook(bookId).then((res) => {
      setBook(res);
    });
  }, [bookId]);

  return { book, likeToggle, addToCart, cartAdded, changeToName };
};
