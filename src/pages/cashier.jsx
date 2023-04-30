import { Link, Routes, Route, Outlet } from "react-router-dom";
import "../cashier.css";

export function Menu() {
  return <div>Menu</div>;
}

export function CreateOrder() {
  return <div>Create Order</div>;
}

export function Dashboard(props) {
  return (
    <div className="horizontal-button-row">
      <div className="buttonContainer large">
        <Link className="button grey large" to="cashier/createOrder/">
          <i class="fa-solid fa-plus"></i>
          <span>Create Order</span>
        </Link>
      </div>
      <div className="buttonContainer large">
        <Link to="cashier/menu/" className="button large">
          <i class="fa-solid fa-rectangle-list"></i>
          <span>Menu</span>
        </Link>
      </div>
    </div>
  );
}

export function CashierDashboard(props) {
  return (
    <div className="dashboard cashier">
      <h1 className="dashboard-heading">Cashier Dashboard</h1>
      <Outlet />
    </div>
  );
}
