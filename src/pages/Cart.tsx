import styled from "styled-components";
import Title from "../components/common/Title";
import CartItem from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useState } from "react";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";

function Cart() {
  const { carts, deleteCartItem, isEmpty } = useCart();

  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const handleCheckItem = (id: number) => {
    //uncheck
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      //check
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleItemDelete = (id: number) => {
    //장바구니 삭제 api
    deleteCartItem(id);
  };
  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {carts.map((item) => (
                <CartItem
                  onCheck={handleCheckItem}
                  checkedItems={checkedItems}
                  key={item.id}
                  cart={item}
                  onDelete={handleItemDelete}
                />
              ))}
            </div>
            <div className="summary"></div>
          </>
        )}
        {isEmpty && (
          <Empty
            title="장바구니가 비었습니다."
            icon={<FaShoppingCart />}
            description={<>장바구니를 채워보세요.</>}
          />
        )}
      </CartStyle>
    </>
  );
}

const CartStyle = styled.div``;

export default Cart;
