import AddToCart from "./AddToCart";

function DessertCard(props) {
  return (
    <>
      <div className="main-card">
        <div className="img-container">
          <img src={props.image.mobile} alt={props.name} />
        </div>
      </div>
      <AddToCart />
      <div className="dessert-details">
        <div className="dessert-category">{props.category}</div>
        <div className="dessert-name">{props.name}</div>
        <div className="dessert-price">{props.price}</div>
      </div>
    </>
  );
}
export default DessertCard;
