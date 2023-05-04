import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { get, post, remove } from "../request.js";
import Menu from "./menu.jsx";
import "../components/modal.css";
import axios from "axios";

function orderReducer(order, action) {
  switch (action.type) {
    case "setInfo": {
      return {
        ...order,
        customer_name: action.data.name,
        customer_phone: action.data.phone,
        items: action.data.items,
      };
    }
    case "add": {
      return {
        ...order,
        items: [
          ...order.items,
          {
            name: action.item.name,
            id: action.item.id,
            thumbnail: action.item.thumbnail,
            price: action.item.price,
            quantity: 1,
          },
        ],
      };
    }
    case "increase": {
      return {
        ...order,
        items: order.items.map((item) => {
          if (item.id == action.id)
            return { ...item, quantity: item.quantity + 1 };
          else return item;
        }),
      };
    }
    case "decrease": {
      return {
        ...order,
        items: order.items
          .map((item) => {
            if (item.id == action.id) {
              if (item.quantity != 1)
                return { ...item, quantity: item.quantity - 1 };
              else return null;
            } else return item;
          })
          .filter((item) => item != null),
      };
    }
    default:
      break;
  }
}

export function Orders() {
  const { orderId } = useParams();
  const [order, dispatch] = useReducer(orderReducer, {
    id: orderId,
    customer_name: "Customer Name",
    customer_phone: 0,
    items: [],
  });
  const [menuShown, setMenuShown] = useState(false);
  const [popupShown, setPopupShown] = useState(false);

  const cancelOrder = () => {
    remove("/billing/cancelOrder", orderId)
      .then((res) => {
        if (res.status == 200) window.location.replace("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const processOrder = () => {
    console.debug(order);
    post("/billing/updateOrder", order)
      .then((res) => {
        if (res.status == 200) {
          setPopupShown(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const payOrder = () => {
    post("/billing/processOrder", { order_id: order.id })
      .then((_res) => {
        setPopupShown(false);
      })
      .catch((err) => console.error(err));
  };

  const addItem = (name, id, price, thumbnail) => {
    setMenuShown(false);
    dispatch({
      type: "add",
      item: { name: name, id: id, price: price, thumbnail: thumbnail },
    });
  };

  const decrease = (id) => {
    dispatch({ type: "decrease", id: id });
  };

  const increase = (id) => {
    dispatch({ type: "increase", id: id });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await get(`/billing/viewOrder?id=${orderId}`);
        console.debug(res.data);
        const name = res.data.customer_name;
        const phone = res.data.customer_phone;
        const items = res.data.items;
        if (items.length != 0) {
          for (let i of items) {
            try {
              console.debug(i.item_id);
              let info = await get(`/menu/getItem?id=${i.item_id}`);
              console.debug(info.data);
              i.thumbnail = info.data.thumbnail;
              i.name = info.data.name;
              i.price = info.data.price;
              i.id = i.data.item_id;
            } catch (error) {
              //console.log(error);
            }
          }
        }
        dispatch({
          type: "setInfo",
          data: { name: name, phone: phone, items: items },
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [orderId]);

  if (menuShown) {
    return <Menu onSelectItem={addItem} edit={false} />;
  } else {
    if (popupShown) {
      return (
        <div className="modal-container-fullscreen">
          <div className="modal">
            <h1>Waiting for payment...</h1>
            <i class="fa-solid fa-circle-notch fa-spin spinner"></i>
            <div className="button-bar">
              <button className="red-bg" onClick={() => setPopupShown(false)}>
                Cancel
              </button>
              <button className="green-bg" onClick={payOrder}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="order-container">
        <h1 className="sub-heading">Order For {order.customer_name}</h1>
        <ul className="order-list">
          {order.items.map((item) => {
            return (
              <li key={item.id} className="order">
                <img src={item.thumbnail} alt="thumbnail" />
                <div className="item-label">
                  <h4 className="item-name">
                    {item.name}
                    <span className="item-quantity">{item.quantity}</span>
                  </h4>
                  <h3 className="price">{item.price}</h3>
                </div>
                <div className="button-bar">
                  <button className="red-bg" onClick={() => decrease(item.id)}>
                    -
                  </button>
                  <button
                    className="green-bg"
                    onClick={() => increase(item.id)}
                  >
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="bottom-bar row">
          <button className="red-bg" onClick={cancelOrder}>
            Cancel
          </button>
          <span className="total">
            Total:
            <span className="total-price">
              {order.items.reduce(
                (x, item) => (x += item.price * item.quantity),
                0
              )}
            </span>
            (incl taxes)
          </span>
          <button
            className="green-bg square"
            onClick={() => setMenuShown(true)}
          >
            +
          </button>
          <button onClick={() => processOrder()}>Proceed</button>
        </div>
      </div>
    );
  }
}
