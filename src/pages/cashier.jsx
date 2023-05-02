import { Link, Routes, Route, Outlet } from "react-router-dom";
import "../cashier.css";
import Menu from "../pages/menu.jsx";

export function CreateOrder() {
  return <div>Create Order</div>;
}

export function Dashboard(props) {
  return (
    <div className="horizontal-button-row">
      <div className="buttonContainer large">
        <Link className="button grey large" to="createOrder/">
          <i class="fa-solid fa-plus"></i>
          <span>Create Order</span>
        </Link>
      </div>
      <div className="buttonContainer large">
        <Link to="menu/" className="button large">
          <i class="fa-solid fa-rectangle-list"></i>
          <span>Menu</span>
        </Link>
      </div>
    </div>
  );
}

export function CashierDashboard({ manager }) {
  if (manager) {
    return (
      <div className="fill centred-flex">
        <div className="unauthorised">
          <div className="row">
            <i class="fa-solid fa-triangle-exclamation large-icon"></i>
            <h1>Unauthorised</h1>
          </div>
          <p>You need to be a cashier to access this page!</p>
          <Link to="/" className="button">
            Homepage
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="dashboard cashier">
      <h1 className="dashboard-heading">Cashier Dashboard</h1>
      <Outlet />
    </div>
  );
}
