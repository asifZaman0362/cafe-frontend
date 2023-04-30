function User(props) {
  if (!props.user) {
    return <></>;
  } else
    return (
      <div className="user">
        <div className="col">
          <div id="level">{props.user.level}</div>
          <div id="username">{props.user.username}</div>
        </div>
        <Link to="/logout">
          <i class="fa-solid fa-door-open"></i>
        </Link>
      </div>
    );
}

export default function Header(props) {
  return (
    <header>
      <div className="title">Cafeteria Management App</div>
      <User user={props.user} />
    </header>
  );
}
