import { useState, useEffect, useReducer } from "react";
import { get, post } from "../request";
import { Link } from "react-router-dom";

function update(name, amount) {}

export default function Inventory() {
  const [data, setData] = useState(null);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await get("/inventory/listInventory");
        console.debug(res.data);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [updated]);

  function edit(name) {
    setData(
      data.map((item) => {
        if (item.name == name) {
          item.editing = true;
        }
        return item;
      })
    );
  }

  function save(name) {
    let quantity = document.querySelector(`#${name}`).value;
    post("/inventory/updateItem", { name: name, quantity: quantity })
      .then((_) => setUpdated(!updated))
      .catch((err) => alert(err));
  }

  if (!data) return <div>Loading...</div>;
  return (
    <div className="inventory col" style={{ margin: "20px" }}>
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {data.length == 0 && (
            <tr>
              <td colspan="3">No Records!</td>
            </tr>
          )}
          {data.map((item) => {
            return (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>
                  {item.editing && (
                    <>
                      <input
                        type="number"
                        defaultValue={item.quantity}
                        id={item.name}
                      />
                      <button
                        className="smolbutton"
                        onClick={() => save(item.name)}
                      >
                        <i class="fa-solid fa-square-check"></i>
                      </button>
                    </>
                  )}
                  {!item.editing && (
                    <>
                      <span>{item.quantity}</span>
                      <button
                        className="smolbutton"
                        onClick={() => edit(item.name)}
                      >
                        <i class="fa-solid fa-square-pen"></i>
                      </button>
                    </>
                  )}
                </td>
                <td
                  className={
                    item.change < 0
                      ? "alt-red-fg bold"
                      : "alt-green-fg plus bold"
                  }
                >
                  {item.change}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="../addInventoryItem" className="button">
        Add Item
      </Link>
    </div>
  );
}
