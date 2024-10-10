import { useState } from "react";
import { Link } from "react-router-dom";
const loggedInUser = () => {
  //API call to check authentication status
  return false;
};

const Title = () => (
  <a href="/">
    <img
      className="logo"
      alt="logo"
      src="https://content3.jdmagicbox.com/comp/rohtak/j1/9999p1262.1262.230322230029.w5j1/catalogue/food-villa-family-restaurant-and-hotel-rohtak-restaurants-vepedpc3pq.jpg"
    ></img>
  </a>
);

//SPA-single page application


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
         <Link  to="/">
            <li>Home</li>
          </Link>
          <Link  to="/About">
            <li>About</li>
          </Link>
          <Link  to="/Contact">
            <li>Contact</li>
          </Link>
          <Link  to="/About">
            <li>Cart</li>
          </Link>
        </ul>
      </div>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
};

export default Header;
