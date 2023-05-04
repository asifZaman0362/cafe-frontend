import "./menu.css";
import "../components/modal.css";
import { TextInput } from "../components/widgets.jsx";
import { useEffect, useState } from "react";
import { get, post, remove } from "../request";
import { Link } from "react-router-dom";

export default function Menu({ edit, onSelectItem = () => {} }) {
  let [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="menu">
      <SelectableList
        heading="Categories"
        edit={edit}
        category={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <MenuGallery
        edit={edit}
        onItemSelect={onSelectItem}
        category={selectedCategory}
      />
    </div>
  );
}

function AddCategory({ updateState, cancel }) {
  return (
    <div className="modal-container-fullscreen">
      <form action="" name="catform">
        <h1 className="form-heading">Add Category</h1>
        <TextInput inputType="text" required="true" name="category"></TextInput>
        <div className="row">
          <button
            className="button stretched-button"
            type="button"
            onClick={() => updateState()}
          >
            Add Category
          </button>
          <button className="button red" onClick={() => cancel()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function SelectableList(props) {
  let [modal, setModal] = useState(false);
  let [categories, setCategories] = useState(null);

  const removeCategory = (id) => {
    remove("/menu/removeCategory", id)
      .then((_res) =>
        setCategories(categories.filter((item) => item._id != id))
      )
      .catch((err) => console.error(err));
  };

  const addCategory = async () => {
    try {
      let categoryName = document.catform.category.value;
      let res = await post("/menu/addCategory", { name: categoryName });
      if (res.status == 200) {
        setModal(false);
        setCategories([...categories, { name: categoryName, id: res.data.id }]);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await get("/menu/listCategories");
        if (res.status == 200) {
          console.debug(res.data);
          setCategories(res.data);
          if (!props.category && res.data.length > 0)
            props.onSelect(res.data[0]._id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories">
      <h1 className="list-heading">{props.heading}</h1>
      <ul>
        {" "}
        {categories.map((item) => (
          <li
            key={item._id}
            onClick={() => {
              console.log("selected: ", item._id);
              props.onSelect(item._id);
            }}
            className={(props.category == item._id ? "selected" : "") + " row"}
          >
            <span className="fill">{item.name}</span>
            {props.edit && (
              <button
                className="red-bg"
                onClick={() => removeCategory(item._id)}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            )}
          </li>
        ))}
      </ul>
      {props.edit && (
        <div className="button" onClick={() => setModal(true)}>
          Add Category
        </div>
      )}
      {modal && (
        <AddCategory
          updateState={() => {
            addCategory();
          }}
          cancel={() => setModal(false)}
        />
      )}
    </div>
  );
}

function MenuGallery(props) {
  let [items, setItems] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        let query = props.category ? `?category=${props.category}` : "";
        console.log(query);
        let res = await get(`/menu/listItems${query}`);
        if (res.status == 200) {
          console.debug(res.data);
          setItems(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [props.category]);

  if (!items) {
    return <div>Loading...</div>;
  }
  return (
    <div className="menu-parent">
      <div className="menu-gallery">
        {items.map((item) => {
          return (
            <div
              className="item-preview"
              onClick={() =>
                props.onItemSelect(
                  item.name,
                  item.id,
                  item.price,
                  item.thumbnail
                )
              }
            >
              <img src={item.thumbnail}></img>
              <div className="item-info">
                <span className="name">{item.name}</span>
                <span className="price">{item.price}</span>
              </div>
            </div>
          );
        })}
        {props.edit && (
          <Link className="add-button" to="../addItem">
            <i class="fa-solid fa-plus"></i>
            <span>Add Item</span>
          </Link>
        )}
      </div>
    </div>
  );
}
