import './checkout.scss'
import { useContext } from "react";
import { CartContext } from "../../contexts/cartDropdownContext";
import CheckoutItem from '../checkout-item/checkoutItem';
const Checkout=()=>{
  const { cartItems ,totalAmount } = useContext(CartContext);
    
    return(

        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    Product
                </div>
                <div className='header-block'>
                    Description
                </div>
                <div className='header-block'>
                    Quantity
                </div>
                <div className='header-block'>
                    Price
                </div>
                <div className='header-block'>
                    Remove
                </div>

            </div>
            {
             cartItems.map((item)=>{
                return <CheckoutItem key={item.id} cartItem={item}/>

            })
            }
            <span className='total'>Total:{totalAmount}</span>
        </div>

    )
}

export default Checkout