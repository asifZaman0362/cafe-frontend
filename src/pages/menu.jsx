function Menu(props) {
  return (
    <div className="menu">
      <Categories />
    </div>
  );
}

function selectThing(item) {}

function SelectableList(props) {
  return (
    <div className="categories">
      <h1 className="list-heading">{props.heading}</h1>
      <ul>
        {" "}
        {props.items.map((item) => (
          <li key={item.id} onClick={() => selectThing(item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
