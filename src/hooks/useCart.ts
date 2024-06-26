import { useEffect, useState } from "react";
import { Cart } from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/carts.api";

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deleteCartItem = (id: number) => {
    deleteCart(id).then(() => {
      //낙관적 업데이트
      setCarts((prev) => {
        const updatedData = prev.filter((cart) => cart.id !== id);
        setIsEmpty(updatedData.length === 0);
        return updatedData;
      });
    });
  };

  useEffect(() => {
    fetchCart().then((carts) => {
      setCarts(carts);
      setIsEmpty(carts.length === 0);
    });
  }, []);

  return { carts, isEmpty, deleteCartItem };
};
