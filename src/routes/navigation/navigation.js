import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../Assets/crown.svg";
import { useSelector } from "react-redux";
import { UserContext } from "../../contexts/userContext";
import CartIcon from "../../Components/cart-icon/cartIcon";
import { CartContext } from "../../contexts/cartDropdownContext";
import { signOutuser } from "../../utils/firebase/firebase";
import CartDropdown from '../../Components/cart-dropdown/cartDropdown'
import "./navigation.scss";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const signOutHandler = async () => {
    await signOutuser();
  };
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {cart && <CartDropdown />}
      </div>
      <div>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Navigation;
