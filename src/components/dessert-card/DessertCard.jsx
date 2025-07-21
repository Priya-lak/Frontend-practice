import "./DessertCard.css";
import AddToCart from "../add-to-cart/AddToCart";
import { useState } from "react";

function DessertCard(props) {
  const { name, price, image, category } = props;
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="card">
      <div className={`img-container ${isSelected ? "selected-img" : ""}`}>
        <img src={image.desktop} alt={name} />
      </div>

      <AddToCart
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        item={{ name, price }}
      />

      <div className="dessert-details">
        <div className="dessert-category">{category}</div>
        <div className="dessert-name">{name}</div>
        <div className="dessert-price">${price}</div>
      </div>
    </div>
  );
}
export default DessertCard;
