import "./DessertCard.css";
import AddToCart from "../add-to-cart/AddToCart";

function DessertCard(props) {
  const { name, price, image, category } = props;

  return (
    <div className="card">
      <div className="img-container">
        <img src={image.desktop} alt={name} />
      </div>

      <AddToCart selected={false} item={{ name, price }} />

      <div className="dessert-details">
        <div className="dessert-category">{category}</div>
        <div className="dessert-name">{name}</div>
        <div className="dessert-price">${price}</div>
      </div>
    </div>
  );
}
export default DessertCard;
