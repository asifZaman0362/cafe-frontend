import Dashboard from "./dashboard.jsx";
import { Link, Outlet } from "react-router-dom";

export default function Manager({ manager }) {
  if (!manager) {
    return (
      <div className="fill centred-flex">
        <div className="unauthorised">
          <div className="row">
            <i class="fa-solid fa-triangle-exclamation large-icon"></i>
            <h1>Unauthorised</h1>
          </div>
          <p>You need to be a manager to access this page!</p>
          <Link to="/" className="button">
            Homepage
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="dashboard manager">
      <h1 className="dashboard-heading">Manager Dashboard</h1>
      <Outlet></Outlet>
    </div>
  );
}
