import { TextInput } from "../components/widgets";
import axios from "axios";
const update = () => {
  let data = {};
  data.name = document.loginform.name.value;
  data.quantity = document.loginform.quantity.value;
  axios
    .post("/inventory/addItem", data, {
      headers: { Authorization: localStorage.getItem("JWT") },
    })
    .then((_res) => {
      alert("data added!");
      window.location.replace("../");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default function AddInventoryItem() {
  return (
    <div className="login-card">
      <form method="POST" name="loginform" className="login-form">
        <h1 className="formheader">Add Login</h1>
        <TextInput
          inputType="text"
          name="name"
          label="name"
          placeholder="Enter name"
        ></TextInput>
        <TextInput
          inputType="number"
          name="quantity"
          label="quantity"
          placeholder="Enter quantity"
        ></TextInput>
        <button
          type="button"
          className="button stretched-button"
          onClick={update}
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
