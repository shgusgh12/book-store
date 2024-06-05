import { create } from "zustand";
//zustand store 관리

//액션 함수 + 상태
interface StoreState {
    isloggedIn : boolean;
    storeLogin : (token : string) => void;
    storeLogout : () => void;
}

export const getToken = () => {
    const token = localStorage.getItem('token')
    return token;
} 

const setToken = (token : string) => {
    localStorage.setItem('token', token);
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

//set으로 상태 정보 변경
export const useAuthStore = create<StoreState>((set) => ({
    isloggedIn : getToken() ? true : false, //초기값
    storeLogin : (token : string) => {
        set({isloggedIn : true});
        setToken(token);
    }, //초기값 업데이트
    storeLogout : () => {
        set({isloggedIn : false});
        removeToken();
    } //초기값 업데이트
}));
