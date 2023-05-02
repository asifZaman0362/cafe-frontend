import "../dashboard.css";

import { Link } from "react-router-dom";
import Graph from "../components/graph.jsx";
import Payment from "../components/payment.jsx";

let rawData = [
  [
    { x: 0, y: 100 },
    { x: 50, y: 400 },
    { x: 100, y: 100 },
    { x: 150, y: 540 },
    { x: 200, y: 300 },
  ],
  [
    { x: 0, y: 120 },
    { x: 50, y: 330 },
    { x: 100, y: 150 },
    { x: 150, y: 420 },
    { x: 200, y: 400 },
  ],
];

function InventoryOverview(props) {
  return (
    <div className="submodue inventory-overview">
      <h1 className="submodule-heading">Inventory</h1>
      <div className="inner">
        <h4 className="inner-heading">Recent Updates</h4>
        <ul className="recent-items-list">
          {props.items.map((item) => (
            <li key={item.id} className="row">
              <p className="name">{item.name}</p>
              <p className={item.change}>{item.amount}</p>
              <span>units</span>
            </li>
          ))}
        </ul>
        <Link to="/inventory" className="button white">
          Inventory
        </Link>
      </div>
    </div>
  );
}

function Sidebar(props) {
  return (
    <div className="submodule dashboard-sidebar">
      <InventoryOverview items={props.items} />
      <hr></hr>
      <Link to="menu" className="fill link">
        <i class="fa-solid fa-rectangle-list"></i>
        <span>Menu</span>
      </Link>
    </div>
  );
}

function AttendanceOverview(props) {
  return (
    <div className="submodule attendance-overview">
      <h1 className="submodule-heading">Staff Attendance</h1>
      <div className="row">
        <div className="col">
          <span className="fill transparent">In Today:</span>
          <span className="in positive transparent">{props.in}</span>
        </div>
        <div className="col">
          <span className="fill transparent">Missing Work:</span>
          <span className="missing negative transparent">{props.missing}</span>
        </div>
      </div>
      <div className="row horizontal fill transparent">
        <Link className="button white fill" to="/newattendance">
          Browse Records
        </Link>
        <Link className="button white fill" to="/listattendance">
          Take Attendance
        </Link>
      </div>
    </div>
  );
}

function BottomBar() {
  return (
    <div className="bottombar submodule">
      <div className="col">
        <Link to="/access" className="fill link">
          <i class="fa-solid fa-address-card"></i>
          Manage Access
        </Link>
      </div>
      <div className="col">
        <Link to="/billing" className="fill link">
          <i class="fa-solid fa-coins"></i>
          Sales & Billing
        </Link>
      </div>
    </div>
  );
}

function SalesGraph() {
  return (
    <div className="canvasContainer">
      <Graph data={rawData} startx={100} endx={50} starty={50} endy={100} />
    </div>
  );
}

export default function Dashboard(props) {
  return (
    <div className="grid">
      <Sidebar items={props.items}></Sidebar>
      <AttendanceOverview
        in={props.attendance.in}
        missing={props.attendance.out}
      ></AttendanceOverview>
      <SalesGraph></SalesGraph>
      <BottomBar></BottomBar>
    </div>
  );
}
