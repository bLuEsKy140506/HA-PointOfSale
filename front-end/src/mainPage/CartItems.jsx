import "./CartItems.css";
import { useEffect, useState } from "react";

export default function CartItems({ cartValues, onCartUpdate }) {
  const [newCart, setNewCart] = useState([]);
  const [count, setCount] = useState(1);
  const [isActive, setIsActive] = useState(false);

  //needed to update the newCart instantly
  useEffect(() => {
    setNewCart(cartValues);
  }, [cartValues]);

  //increment, and then create a new array of object
  function increment(index1, itemquantity) {
    setCount(function (prevCount) {
      return (prevCount += 1);
    });
    if (newCart[index1].max < itemquantity + 1) {
      return alert("Quantity ordered exceeds the number of item in the stock");
    } else {
      let newItem = newCart.map((obj, index) => {
        if (index === index1) {
          return { ...obj, quantity: itemquantity + 1 };
        }
        return obj;
      });
      onCartUpdate(newItem);
    }
  }

  //decrement, and then create a new array of object
  function decrement(index1, itemquantity) {
    let newItem = newCart.map((obj, index) => {
      if (index === index1) {
        return itemquantity === 0
          ? { ...obj, quantity: 0 }
          : { ...obj, quantity: itemquantity - 1 };
      }
      return obj;
    });
    onCartUpdate(newItem);
  }
  //this is will run, but it is not fully functional because during the test run, it has a delay
  //you need to double click in order the number to increase or decrease by one. I just leave it because not relatevant to the HA
  function handleChange(index1) {
    if (newCart[index1].max < count) {
      return alert("Quantity ordered exceeds the number of item in the stock");
    } else {
      let newItem = newCart.map((obj, index) => {
        if (index === index1) {
          return { ...obj, quantity: count };
        }
        return obj;
      });
      onCartUpdate(newItem);
    }
  }
  //delete function
  function handleDelete(item_name) {
    let filtered = newCart.filter((a) => a.name !== item_name);
    onCartUpdate(filtered);
  }

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
        }}
      >
        <h2>
          <i
            className="fa badge"
            style={{
              fontSize: "24px",
            }}
            value={cartValues.length}
          >
            &#xf07a;
          </i>
          YOUR CART INFO
        </h2>
        <button
          style={{
            padding: "4px 6px",
            borderRadius: "10px",
            position: "absolute",
            top: "0",
            right: "0",
          }}
          onClick={handleClick}
        >
          {isActive ? "SHOW" : "HIDE"}
        </button>
      </div>
      <div className={isActive ? "hide" : "show"}>
        <table className="cart-table">
          <thead>
            <tr>
              <td>IMAGE</td>
              <td>ITEM NAME</td>
              <td>QUANTITY</td>
              <td>PRICE</td>
              <td>SUBTOTAL</td>
              <td>DEL?</td>
            </tr>
          </thead>
          <tbody>
            {newCart.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.pic}
                    alt={`${item.pic}-img`}
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  <div className="counter">
                    <div className="quantity-btn">
                      <button onClick={() => decrement(index, item.quantity)}>
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        max="100"
                        onChange={(e) => {
                          setCount(Number(e.target.value));
                          handleChange(index);
                        }}
                        style={{
                          width: "25px",
                          textAlign: "center",
                        }}
                      />
                      <button onClick={() => increment(index, item.quantity)}>
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td>₱ {item.price}</td>
                <td>₱ {item.price * item.quantity}.00</td>
                <td>
                  <button
                    style={{
                      padding: "5px 8px",
                      borderRadius: "50%",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();

                      handleDelete(item.name);
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>GRAND TOTAL</td>
              <td
                colSpan={2}
                style={{
                  fontSize: "1rem",
                  fontWeight: "bolder",
                }}
              >
                ₱{" "}
                {newCart.reduce(function (a, b) {
                  return a + b.quantity * Number(b.price);
                }, 0)}
                .00
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* <div>
        <p>
          <span>NAME OF THE ITEM</span> -- <span>QUANTITY</span> X{" "}
          <span>PRICE</span> = <span>SUBTOTAL</span>
        </p>
        {cartValues.map((items) => (
          <>
            <p>
              <span>{items.name}</span> -- <span>{items.quantity}</span> pieces
              X <span>₱ {items.price}</span> ={" "}
              <span>₱ {items.quantity * items.price}.00</span>
            </p>
          </>
        ))}
      </div> */}
    </div>
  );
}
