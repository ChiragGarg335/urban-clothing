import "./checkoutItem.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cartDropdownContext";

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, reduceItemFromCart, removeItemFromCheckout } =
    useContext(CartContext);

  const { name, price, quantity, imageUrl } = cartItem;
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        <div className="arrow" onClick={() => reduceItemFromCart(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemToCart(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>

      <div
        className="remove-button"
        onClick={() => {
          removeItemFromCheckout(cartItem);
        }}
      >
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
