import axios from "axios";
import { useReducer, useState } from "react";
import { Menu } from "./menu";

function processOrder(order) {
  console.debug(order);
  axios
    .post("/api/cashier/updateOrder", order, {
      auth: localStorage.getItem("JWT"),
    })
    .then(
      (response) => {},
      (reason) => console.log("failed: " + reason)
    )
    .catch((error) => console.error(error));
}

function orderReducer(order, action) {
  switch (action.type) {
    case "add": {
      return {
        ...order,
        items: [...order.items, { id: action.id, quantity: 1 }],
      };
    }
    case "remove": {
      return {
        ...order,
        items: order.items.filter((x) => x != action.id),
      };
    }
    case "increase": {
      let id = action.id;
      return {
        ...order,
        items: order.items.map((item) =>
          item.id == id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    case "decrease": {
      let id = action.id;
      return {
        ...order,
        items: order.items
          .map((item) =>
            item.id == id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity != 0),
      };
    }
    default:
      break;
  }
}

export function Orders(props) {
  const [order, dispatch] = useReducer(orderReducer, props.order);
  const [showMenu, setShowMenu] = useState(false);

  function addItem(id) {
    setShowMenu(false);
    dispatch({
      type: "add",
      id: id,
    });
  }

  return (
    <div className="order-page">
      {showMenu && <Menu onItemSelect={addItem} />}
      {!showMenu && (
        <div className="order-container">
          <h1 className="dashboard-title">
            Cashier Dashboard {" -> "}
            <span className="dashboard-subtitle">
              Order for <span className="order-for">{order.customer}</span>{" "}
            </span>{" "}
          </h1>
          <ul className="order-list">
            {order.items.map((item) => (
              <li className="order" key={item.id}>
                <img
                  src="http://www.pbs.org/food/wp-content/blogs.dir/2/files/2015/07/Washington-Cake450.jpg"
                  alt={item.name}
                />
                <div className="item-label">
                  <h4 className="item-name">
                    {item.name}
                    <span className="item-quantity">{item.quantity}</span>
                  </h4>
                  <h3 className="price">{item.price}</h3>
                </div>
                <div className="button-bar">
                  <button
                    className="negative"
                    onClick={() => dispatch({ type: "decrease", id: item.id })}
                  >
                    -
                  </button>
                  <button
                    className="positive"
                    onClick={() => dispatch({ type: "increase", id: item.id })}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="row">
            <div className="flex-grow">
              <button className="negative">Cancel</button>
            </div>
            <div className="order-overview">
              <p className="total">
                Total: <span>{order.price}</span>
              </p>
              <button className="positive" onClick={() => setShowMenu(true)}>
                +
              </button>
              <button className="blue">proceed</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
