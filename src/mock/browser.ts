import { setupWorker } from "msw/browser";
import { addReview, reviewsById } from "./reviews";

//나중에 안쓸때 handler에서 제외하기
const handlers = [reviewsById, addReview];

export const worker = setupWorker(...handlers);
