import "./cartDropdown.scss";
import Button from "../button/button";
import CartItem from "../cart-item/cartItem";
import { useContext } from "react";
import { CartContext } from "../../contexts/cartDropdownContext";
import { Link } from "react-router-dom";


const CartDropdown = () => {
  const { cartItems , setCart} = useContext(CartContext);
    const closeCart =()=>{
        setCart(false)
    } 

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link to="/checkout">
        <Button onClick={closeCart}>CHECKOUT</Button>
      </Link>
    </div>
  );
};
export default CartDropdown;
