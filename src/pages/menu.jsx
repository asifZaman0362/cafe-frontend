export function Menu(props) {
  return (
    <div className="menu">
      <SelectableList />
      <MenuGallery onItemSelect={props.onItemSelect} />
    </div>
  );
}

function SelectableList(props) {
  return (
    <div className="categories">
      <h1 className="list-heading">{props.heading}</h1>
      <ul>
        {" "}
        {props.items.map((item) => (
          <li key={item.id} onClick={() => props.onItemSelect(item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuGallery(props) {
  return (
    <div className="menu-gallery">
      {props.items.map((item) => {
        <div
          className="item-preview"
          onClick={() => props.onItemSelect(item.id)}
        >
          <image src={props.thumbnail}></image>
        </div>;
      })}
    </div>
  );
}
