import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { apiUrl } from "../../../api";
import { dishImage, handleImageError } from "../dishImages";
function DishDetailPage() {
  const { id } = useParams(); // from /dish/:id
  const {data: dish, isLoading, error} = useFetch(apiUrl(`/api/menu/${encodeURIComponent(id)}`));

  if(isLoading)return<p>Loading dish details...</p>
  if(error)return <p>Could not load dish details: {error}</p>

  if(!dish)return <p>Dish not found</p>

  return (
    <div className="dish-detail">
      <p>Showing details for dish {dish.name}</p>
      <img src={dishImage(dish)} onError={handleImageError} alt={dish.name} style={{ width: "500px", height: "300px", objectFit: "cover" }} />
      <h2>{dish.name}</h2>
      <p>Price: Rs. {dish.price.toFixed(2)}</p>
      <p>Category: {dish.category}</p>
      <Link to="/">← Back to menu</Link>
    </div>
  );
}
export default DishDetailPage;
