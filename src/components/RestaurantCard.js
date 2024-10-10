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
            src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"
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