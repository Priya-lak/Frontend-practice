import Data from "../../../data.json";
import Card from "../../components/dessert-card/DessertCard";
import "./Desserts.css";

function Desserts() {
  return (
    <div className="desserts">
      <h1>Desserts</h1>
      <div className="cards">
        {Data.map((dessert) => (
          <Card
            key={dessert.name}
            name={dessert.name}
            category={dessert.category}
            price={dessert.price}
            image={dessert.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Desserts;
