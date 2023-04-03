import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>
        The page you are looking for does not exist. It may have been relocated
        to another place on this site.
      </p>
      <Link to="/" className="button">Homepage</Link>
    </div>
  );
}
