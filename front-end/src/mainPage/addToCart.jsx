// import ButtonCounter from "./buttonCounter";
import { useState } from "react";
import "./addtoCart.css";

export default function AddToCart({ data, onAddCartItem }) {
  const [count, setCount] = useState(1);

  //increment by 1 everytime the + button is clicked
  function increment(e) {
    setCount((prevCount) => (prevCount += 1));
  }
  //decrement by 1 everytime the - button is clicked
  function decrement() {
    setCount((prevCount) => {
      if (prevCount > 0) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 0);
      }
    });
  }
  //create a new object with this modified object structure
  const putSelected = (e) => {
    e.preventDefault();
    if (count !== 0) {
      const newItem = {
        name: data.item_name,
        price: data.price,
        quantity: count,
        pic: data.imgsrcLink,
        max: data.quantity,
      };
      //delivered back to parent component
      onAddCartItem(newItem);
      //after everytime add to cart is clicked then set the count to 1
      setCount(1);
    }
  };

  return (
    <>
      <div className="buttons-corner">
        <form className="content-form" onSubmit={putSelected}>
          <button className="button">Add to Cart</button>
        </form>
        <div className="counter">
          <div className="quantity-btn">
            <span>QTY</span>
            <button onClick={decrement}>-</button>
            <input
              type="number"
              value={count}
              min="1"
              onChange={(e) => {
                setCount(Number(e.target.value));
              }}
              style={{
                width: "30px",
                textAlign: "center",
              }}
            />
            <button onClick={increment}>+</button>
          </div>
        </div>
      </div>
    </>
  );
}
