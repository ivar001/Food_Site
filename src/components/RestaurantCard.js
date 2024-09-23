import { IMG_CDN_URL } from "../config";

const RestaurantCard = ({
    name,
    cuisines,
    cloudinaryImageId,
    lastMileTravelString,
  })=>{
    return(
      <div className="card">
        <img 
            src={
               +
            cloudinaryImageId
          }
        />
        <h2>{name}</h2>
        <h3>{cuisines.join(", ")}</h3>
        <h4>{lastMileTravelString} mins</h4>
      </div>
    );
  }; 

export default RestaurantCard;