import { Link } from "react-router-dom";

function User({ level, username }) {
  if (!level) {
    return <></>;
  } else
    return (
      <div className="user">
        <div className="col">
          <div id="level">{level}</div>
          <div id="username">{username}</div>
        </div>
        <i class="fa-solid fa-door-open"></i>
      </div>
    );
}

export default function Header({ level, username }) {
  return (
    <header>
      <div className="title">Cafeteria Management App</div>
      <User level={level} username={username} />
    </header>
  );
}
