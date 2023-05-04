import { get } from "../request.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ListOrders() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await get("/billing/viewOrders");
        console.debug(res);
        if (res.status == 200) {
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  } else {
    if (data.length == 0)
      return (
        <div className="col">
          <h1>No Entries!</h1>
        </div>
      );
    return (
      <div className="col">
        <h1>Orders</h1>
        <table className="orders-table">
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => {
              return (
                <tr key={order._id}>
                  <td>
                    <Link to={`../order/${order._id}`}>{order._id}</Link>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.customer_phone}</td>
                  <td>
                    {order.paid ? (
                      <span>
                        <i class="fa-solid fa-circle-check green-fg"></i> Paid
                      </span>
                    ) : (
                      <span>
                        <i class="fa-solid fa-circle-xmark red-fg"></i> Not Paid
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
