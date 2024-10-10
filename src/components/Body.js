import { restaurantList } from "../config";
import RestaurantCard from "./RestaurantCard";
import React, { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";

function filterData(searchText, restaurants) {
  const filteredData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filteredData;
}

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState(""); //to create state variable

  useEffect(() => {
    //API call
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/"; // Add this back if needed.
      const targetUrl =
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.27060&lng=85.83340";
      const data = await fetch(proxyUrl + targetUrl);
      const json = await data.json();
      setAllRestaurants(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      setFilteredRestaurants(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      console.log(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  if (!allRestaurants) return null;

  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            // Update searchText when typing in the input box
            setSearchText(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            // Filter the data and update the state
            const data = filterData(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>
      </div>

      <div className="restaurant-list">
        {filteredRestaurants.length === 0 ? (
          <h1>No restaurants found.</h1>
        ) : (
          filteredRestaurants.map((restaurant, index) => {
            const { info } = restaurant;

            // Ensure `info` and `info.id` are available
            if (!info || !info.id) {
              console.error("Missing data for restaurant:", restaurant);
              return null;
            }

            return (
              <Link to={`/restaurant/${restaurant.info.id}`} key={restaurant.info.id}>
                <RestaurantCard {...restaurant.info} />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Body;
