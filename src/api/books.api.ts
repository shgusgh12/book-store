import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams{
    category_id? : number;
    news? : boolean;
    currentPage? : number;
    limit : number;
}

interface FetchBooksResponse {
    books : Book[];
    pagination : Pagination;
}

export const fetchBooks =async (params: FetchBooksParams) => {
    try{
        const response = await httpClient.get('/books', {
            params : params,
        })
        
        return response.data;
    }
    catch (error) {
        return{
            books : [],
            pagination : {
                totalCount : 0,
                currentPage : 1,
            }
        }
    }
}

export const fetchBook =async (bookId : string|undefined) => {
    const response = await httpClient.get(`/books/${bookId}`);

    return response.data;
}

export const likeBook =async (bookId: number) => {
    const response = await httpClient.post(`/likes/${bookId}`);
    
    return response.data;
}

export const unLikeBook = async (bookId: number) => {
    const response = await httpClient.delete(`/likes/${bookId}`);
    
    return response.data;
}

