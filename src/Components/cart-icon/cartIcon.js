import { ReactComponent as ShoppingIcon } from "../../Assets/shoppingBag.svg";
import "./cartIcon.scss";
import { CartContext } from "../../contexts/cartDropdownContext";
import React, { useContext } from "react";

const CartIcon = () => {
  const { cart, setCart, cartCardItems } = useContext(CartContext);

  const cartHandler = () => {
    setCart(!cart);
  };
  return (
    <div className="cart-icon-container" onClick={cartHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCardItems}</span>
    </div>
  );
};

export default CartIcon;
