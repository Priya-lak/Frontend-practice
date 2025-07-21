import AddToCart from "./AddToCart";

function DessertCard(props) {
  const { name, price, image, category } = props;

  return (
    <>
      <div className="main-card">
        <div className="img-container">
          <img src={image.mobile} alt={name} />
        </div>
      </div>

      <AddToCart selected={false} item={{ name, price }} />

      <div className="dessert-details">
        <div className="dessert-category">{category}</div>
        <div className="dessert-name">{name}</div>
        <div className="dessert-price">{price}</div>
      </div>
    </>
  );
}
export default DessertCard;
