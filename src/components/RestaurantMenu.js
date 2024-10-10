import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./shimmer";
import {CDN_URL} from "../config";

const RestaurantMenu = () => {
  const { id } = useParams();  
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getRestaurantInfo();
    } else {
      setError("Restaurant ID is missing.");
    }
  }, [id]);

  async function getRestaurantInfo() {
    try {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
      const targetUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=20.27060&lng=85.83340&restaurantId=${id}`;

      const response = await fetch(proxyUrl + targetUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
      }

      const json = await response.json();
      console.log(json);

      setRestaurant(json?.data?.cards[2]?.card?.card?.info);  // Setting restaurant info

      // Fetching and setting menu items
      const menuData = json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.flatMap(card => card.card?.itemCards || []);
      setMenuItems(menuData);
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
      setError("Could not fetch restaurant details. Please try again later.");
    }
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }


  return (!restaurant)?<Shimmer/>:(
    <div className="menu-container">
      <h1>Restaurant ID: {id}</h1>
      {restaurant ? (
        <>
          <div>
            <h2>{restaurant.name}</h2>
            <img src={CDN_URL + restaurant.cloudinaryImageId}alt="Restaurant" />
            <h2>{restaurant.city}</h2>
            <h2>{restaurant.locality}</h2>
            <h2>{restaurant.avgRating} ⭐</h2>
          </div>
          <div>
            <h2>Menu</h2>
            <ul>
              {menuItems.length > 0 ? (
                menuItems.map((item, index) => (
                  <li key={item.card?.info?.id || index}>
                    {item.card?.info?.name} - ₹{(item.card?.info?.price || item.card?.info?.defaultPrice) / 100}
                  </li>
                ))
              ) : (
                <p>No menu items available</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading restaurant details...</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
