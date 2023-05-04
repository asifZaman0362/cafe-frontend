import axios from "axios";
import { useEffect, useState } from "react";
import { TextInput, DropDown } from "../components/widgets";
import { get } from "../request";

function addItem() {
  let formData = new FormData();
  let fileElement = document.loginform.thumbnail;
  let name = document.loginform.item_name.value;
  let price = document.loginform.price.value;
  let category = document.loginform.category.value;
  formData.append("name", name);
  formData.append("price", price);
  formData.append("category", category);
  formData.append("thumbnail", fileElement.files[0]);
  console.debug(formData);
  axios
    .post("/menu/addItem", formData, {
      headers: {
        Authorization: localStorage.getItem("JWT"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {})
    .catch((error) => console.error(error));
}

export default function AddItem() {
  let [data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await get("/menu/listCategories");
        if (res.status == 200) {
          let categories = [];
          res.data.map((category) => categories.push(category.name));
          setData(categories);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  if (!data) return <div>Loading</div>;
  return (
    <div className="login-card">
      <form method="POST" name="loginform" className="login-form">
        <h1 className="formheader">Add Item</h1>
        <div className="row">
          <TextInput
            inputType="text"
            name="item_name"
            label="item name"
            placeholder="Enter item name"
          ></TextInput>
          <DropDown name="category" label="category" options={data} />
        </div>
        <TextInput
          inputType="number"
          name="price"
          label="Price"
          placeholder="Enter price"
        ></TextInput>
        <div className="row">
          <label htmlFor="thumbnail">Thumbnail</label>
          <input type="file" accept="image/jpeg" name="thumbnail" />
        </div>
        <button
          type="button"
          className="button stretched-button"
          onClick={addItem}
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
