import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const removeItemCheckout = (cartItems, itemToremove) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToremove.id);
};

export const CartContext = createContext({
  cart: true,
  setCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCardItems: 0,
  reduceItemFromCart: () => {},
  removeItemFromCheckout: () => {},
  totalAmount: 0,
});

const INITIAL_STATE = {
  cart: false,
  cartItems: [],
  cartCardItems: 0,
  totalAmount: 0,
};

const USER_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN:"SET_IS_CART_OPEN"
};

export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CART_ITEMS: {
      return {
        ...state,
        ...payload,
      };
    }
    case USER_ACTION_TYPES.SET_IS_CART_OPEN:{
        return{
            ...state,
            cart:payload
        }
    }
    default: {
      throw new Error(`Unhandled type in ${type} in cartDropdownReducer`);
    }
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCardItems, totalAmount, cart }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newTotal = newCartItems.reduce(
      (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
      0
    );

    dispatch({
      type: USER_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        totalAmount: newTotal,
        cartCardItems: newCartCount,
        cartItems: newCartItems,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const reduceItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCheckout = (itemToremove) => {
    const newCartItems = removeItemCheckout(cartItems, itemToremove);
    updateCartItemsReducer(newCartItems);
  };

  const setCart=(bool)=>{
    dispatch({type:USER_ACTION_TYPES.SET_IS_CART_OPEN,payload:bool})
  }
  

  const value = {
    cart,
    setCart,
    addItemToCart,
    cartItems,
    cartCardItems,
    reduceItemFromCart,
    removeItemFromCheckout,
    totalAmount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
