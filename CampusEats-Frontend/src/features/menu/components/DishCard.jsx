import { Link } from "react-router-dom";
import { dishImage, handleImageError } from "../dishImages";
function DishCard({ dish }) {

  return (
    <Link to={`/dish/${dish.id}`} className="dish-card-link">
      <div className="dish-card">
        <img src={dishImage(dish)} onError={handleImageError} alt={dish.name} className="dish-card-image" />
        <h3>{dish.name}</h3>
        <p>Rs. {dish.price.toFixed(2)}</p>
        <small>{dish.category}</small>
        {!dish.available && <span> — Sold out</span>}
      </div>
    </Link>
  );
}
export default DishCard;
