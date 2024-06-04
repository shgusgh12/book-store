import { Category } from "../models/category.model";
import { httpClient } from "./http";

//category에 접속해 응답중 data를 리턴
export const fetchCategory = async () => {
    const response = await httpClient.get<Category[]>('/category');
    return response.data
}

 