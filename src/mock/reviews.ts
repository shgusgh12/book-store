import { HttpResponse, http } from "msw";
import { BookReviewItem } from "@/models/book.model";
import { fakerKO as faker } from "@faker-js/faker";
//faker.js로 모킹데이터 생성
// const mockReviewsData: BookReviewItem[] = [
//   {
//     id: 1,
//     userName: "bob",
//     content: "감사합니다",
//     createdAt: "2024-01-01",
//     score: 5,
//   },
//   {
//     id: 2,
//     userName: "bob2",
//     content: "감사합니다2",
//     createdAt: "2024-01-01",
//     score: 2,
//   },
// ];

const mockReviewsData: BookReviewItem[] = Array.from({
  length: 8,
}).map((_, index) => ({
  id: index,
  userName: `${faker.person.lastName()}${faker.person.firstName()}`,
  content: faker.lorem.paragraph(),
  createdAt: faker.date.past().toISOString(),
  score: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
}));

export const reviewsById = http.get(
  "http://localhost:9999/reviews/:bookId",
  () => {
    return HttpResponse.json(mockReviewsData, {
      status: 200,
    });
  }
);

export const addReview = http.post(
  "http://localhost:9999/reviews/:bookId",
  () => {
    return HttpResponse.json(
      {
        message: "리뷰가 등록되었습니다",
      },
      {
        status: 200,
      }
    );
  }
);
