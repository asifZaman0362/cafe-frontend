function User({ level, username, setToken }) {
  if (!level) {
    return <></>;
  } else
    return (
      <div className="user">
        <div className="col">
          <div id="level">{level}</div>
          <div id="username">{username}</div>
        </div>
        <i class="fa-solid fa-door-open" onClick={() => setToken()}></i>
      </div>
    );
}

export default function Header({ level, username, setToken }) {
  return (
    <header>
      <div className="title">Cafeteria Management App</div>
      <User level={level} username={username} setToken={setToken} />
    </header>
  );
}
