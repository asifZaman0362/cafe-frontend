import "./menu.css";
import "../components/modal.css";
import { TextInput } from "../components/widgets.jsx";
import { useEffect, useState } from "react";
import { get, post } from "../request";

let items = [
  {
    name: "Item",
    price: 29,
    thumbnail:
      "https://image.slidesharecdn.com/foodcarving-150618055801-lva1-app6891/95/food-carving-and-there-meaning-1-638.jpg?cb=1434607373",
  },
  {
    name: "Item",
    price: 29,
    thumbnail:
      "https://image.slidesharecdn.com/foodcarving-150618055801-lva1-app6891/95/food-carving-and-there-meaning-1-638.jpg?cb=1434607373",
  },
  {
    name: "Item",
    price: 29,
    thumbnail:
      "https://image.slidesharecdn.com/foodcarving-150618055801-lva1-app6891/95/food-carving-and-there-meaning-1-638.jpg?cb=1434607373",
  },
  {
    name: "Item",
    price: 29,
    thumbnail:
      "https://image.slidesharecdn.com/foodcarving-150618055801-lva1-app6891/95/food-carving-and-there-meaning-1-638.jpg?cb=1434607373",
  },
  {
    name: "Item",
    price: 29,
    thumbnail:
      "https://image.slidesharecdn.com/foodcarving-150618055801-lva1-app6891/95/food-carving-and-there-meaning-1-638.jpg?cb=1434607373",
  },
  {
    name: "Item",
    price: 29,
    thumbnail:
      "https://image.slidesharecdn.com/foodcarving-150618055801-lva1-app6891/95/food-carving-and-there-meaning-1-638.jpg?cb=1434607373",
  },
];

export default function Menu({ edit }) {
  return (
    <div className="menu">
      <SelectableList heading="Categories" edit={edit} />
      <MenuGallery items={items} onItemSelect={() => {}} />
    </div>
  );
}

function AddCategory({ updateState }) {
  return (
    <div className="modal-container-fullscreen">
      <form action="" name="catform">
        <h1 className="form-heading">Add Category</h1>
        <TextInput inputType="text" required="true" name="category"></TextInput>
        <button
          className="button stretched-button"
          type="button"
          onClick={() => updateState()}
        >
          Add Category
        </button>
      </form>
    </div>
  );
}

function SelectableList(props) {
  let [modal, setModal] = useState(false);
  let [categories, setCategories] = useState(null);

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
          <li key={item.id} onClick={() => props.onItemSelect(item.id)}>
            {item.name}
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
        />
      )}
    </div>
  );
}

function MenuGallery(props) {
  return (
    <div>
      <div className="menu-gallery">
        {props.items.map((item) => {
          return (
            <div
              className="item-preview"
              onClick={() => props.onItemSelect(item.id)}
            >
              <img src={item.thumbnail}></img>
              <div className="item-info">
                <span className="name">{item.name}</span>
                <span className="price">{item.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
