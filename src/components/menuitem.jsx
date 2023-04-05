function MenuItem(props) {
  return (
    <div className="menu-item">
      <img src={props.src} alt={props.alt} className="item-thumbnail" />
      <h1 className="item-name">{props.item_name}</h1>
      <h2 className="price">{props.price}</h2>
    </div>
  );
}
