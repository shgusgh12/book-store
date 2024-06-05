import {useState, useEffect } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
    const [category, setCategory] = useState<Category[]>([]);
    const location = useLocation();

    //
    const setActive = () => {
        const params = new URLSearchParams(location.search);
        if(params.get('category_id')){
            setCategory((prev) => {
                return prev.map((item) => {
                    return{
                        ...item,
                        isActive: item.category_id === Number(params.get('category_id')),

                    }
                })
            })
        }
        //전체를 클릭했을때
        else{
            setCategory((prev) => {
                return prev.map((item) => {
                    return{
                        ...item,
                        isActive: false,
                    }
                })
            })
        }
    }
    useEffect(() => {
        fetchCategory().then((category) => {
            if(!category) return
            const categoryWithAll = [
                {
                    category_id : null,
                    category_name : '전체',
                },
                ...category,
            ]

        setCategory(categoryWithAll);
        setActive();
        })
    },[]);

    //location 바뀔때 active 업데이트
    useEffect(() => {
        setActive();
    },[location.search])

    return { category };
}