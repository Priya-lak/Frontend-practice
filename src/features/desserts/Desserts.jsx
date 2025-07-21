import Data from "../../../data.json";
import Card from "../../components/DessertCard";

function Desserts() {
  return (
    <>
      <h1>Desserts</h1>
      {Data.map((dessert) => (
        <Card
          name={dessert.name}
          category={dessert.category}
          price={dessert.price}
          image={dessert.image}
        />
      ))}
    </>
  );
}

export default Desserts;
