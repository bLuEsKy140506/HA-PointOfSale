import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import AddToCart from "./addToCart";
import CartItems from "./CartItems";

import "./main-content.css";

export default function MainContent() {
  const [allitem, setAllItem] = useState([]);
  const [cartData, setCartData] = useState([]);
  //  Step 6
  //  Make sure that the response holds an array of objects in JSON format.
  //  http://127.0.0.2:3420/items
  //  fetch the data from server
  useEffect(() => {
    axios.get("http://127.0.0.2:3420/items").then((response) => {
      setAllItem(response.data);
    });
  }, []);
  //this function pass as a prop in <Addtocart > to get the specific card that chosen to be added in the cart
  const updatedCart = (newCartData) => {
    //check if it exist
    const checkItem = (obj) => obj.name === newCartData.name;
    const exist = cartData.some(checkItem);
    //check if the quantity of the chosen card exceed the its maximum number of stock
    if (newCartData.max < newCartData.quantity) {
      return alert("Quantity ordered exceeds the number of item in the stock");
    }
    //check if the no item in the cart
    if (cartData.length === 0) {
      //if none, then add the chosen cart
      setCartData((prevCartData) => [newCartData, ...prevCartData]);
      notify(`👌 ${newCartData.name} ITEM IS ADDED INTO YOUR CART🛒!`);
    } else if (exist) {
      //if exist, then update the quantity of this specific card
      let indexedNumber1 = cartData.findIndex(
        (x) => x.name === newCartData.name
      );
      //if not exceed to maximum when the existing number and new quantity are added together
      if (
        newCartData.max <
        newCartData.quantity + cartData[indexedNumber1].quantity
      ) {
        //if yes then return this message
        return alert(
          "Quantity ordered exceeds the number of item in the stock"
        );
      }
      //notify, this component is an add-on. It is a toastify function of react
      notify(`ITEM 👉 ${newCartData.name} quantity has been modified`);
      //then create a new array with the modified data of the specific card
      const newList = cartData.map((obj) => {
        if (obj.name === newCartData.name) {
          return { ...obj, quantity: obj.quantity + newCartData.quantity };
        }
        return obj;
      });
      //then update the cart data
      setCartData(newList);
    } else {
      //if not exist then add to the array
      setCartData((prevCartData) => [newCartData, ...prevCartData]);
      notify(`👌 ${newCartData.name} ITEM IS ADDED INTO YOUR CART🛒!`);
    }
  };

  //this function pass as a prop in <CartItems > to get the updated array of the modified cart data (array of objects)
  const onCartUpdate = (newCartData) => {
    setCartData(newCartData);
  };
  //react toastify --
  const notify = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="main-content">
        <div className="filtered-items-container">
          {allitem.map((item) => (
            <div key={item.id} className="card-info">
              <div className="img-container">
                <figure>
                  <img
                    src={item.imgsrcLink}
                    alt={`pictures-of-${item.item_name}`}
                  />
                </figure>
              </div>
              <div className="description-container">
                <div className="tag-and-itemleft">
                  <div className="tag">
                    <span>CATEGORY: </span>
                    <span className="item-description category">
                      {item.category}
                    </span>
                  </div>
                  <div className="item--left">
                    <span>ITEM LEFT: </span>
                    <span className="item-description item-left">
                      {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex-row itemprice">
                  <span className="item-description itemname">
                    {item.item_name}
                  </span>
                  <span className="item-description price">₱ {item.price}</span>
                </div>

                <AddToCart data={item} onAddCartItem={updatedCart} />
              </div>
            </div>
          ))}
        </div>
        {/* Show only if the cart has a content */}
        {cartData.length > 0 && (
          <div className="cart-info cart-info2">
            <CartItems cartValues={cartData} onCartUpdate={onCartUpdate} />
          </div>
        )}
        {/* react toastify - just an add-on */}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}
