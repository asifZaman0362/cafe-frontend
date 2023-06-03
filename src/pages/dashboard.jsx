import "../dashboard.css";

import { Link } from "react-router-dom";
import Graph from "../components/graph.jsx";
import Payment from "../components/payment.jsx";
import { useEffect, useState } from "react";
import { get } from "../request";

function InventoryOverview() {
  const [data, setData] = useState(null);
  useEffect(() => {
    get("/inventory/listInventory")
      .then((res) => {
        console.debug(res.data);
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="submodue inventory-overview">
      <h1 className="submodule-heading">Inventory</h1>
      <div className="inner">
        <h4 className="inner-heading">Recent Updates</h4>
        <ul className="recent-items-list">
          {data.slice(0, 5).map((item) => (
            <li key={item.id} className="row">
              <p className="name">{item.name}</p>
              <p className={item.change >= 0 ? "positive" : "negative"}>
                {Math.abs(item.change)}
              </p>
              <span>units</span>
            </li>
          ))}
        </ul>
        <Link to="inventory" className="button white">
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

function AttendanceOverview() {
  const [data, setData] = useState(null);
  useEffect(() => {
    get("/attendance/getRecord/" + new Date().toISOString().slice(0, 10))
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.err(err));
  }, []);
  if (!data) {
    return (
      <div className="submodule attendance-overview">
        <h1 className="submodule-heading">Staff Attendance</h1>
        <div>No Record for today!</div>
        <div className="row horizontal fill transparent">
          <Link className="button white fill" to="listAttendance">
            Browse Records
          </Link>
          <Link className="button white fill" to="addAttendance">
            Take Attendance
          </Link>
        </div>
      </div>
    );
  } else {
    let [present, absent] = [0, 0];
    data.entries.map((entry) => {
      if (entry.attendance) {
        present++;
      } else absent++;
    });
    return (
      <div className="submodule attendance-overview">
        <h1 className="submodule-heading">Staff Attendance</h1>
        <div className="row">
          <div className="col">
            <span className="fill transparent">In Today:</span>
            <span className="in positive transparent">{present}</span>
          </div>
          <div className="col">
            <span className="fill transparent">Missing Work:</span>
            <span className="missing negative transparent">{absent}</span>
          </div>
        </div>
        <div className="row horizontal fill transparent">
          <Link className="button white fill" to="listAttendance">
            Browse Records
          </Link>
          <Link className="button white fill" to="addAttendance">
            Take Attendance
          </Link>
        </div>
      </div>
    );
  }
}

function BottomBar() {
  return (
    <div className="bottombar submodule">
      <div className="col">
        <Link to="access" className="fill link">
          <i class="fa-solid fa-address-card"></i>
          Manage Access
        </Link>
      </div>
      <div className="col">
        <Link to="sales" className="fill link">
          <i class="fa-solid fa-coins"></i>
          Sales & Billing
        </Link>
      </div>
      <div className="col">
        <Link to="manageEmployees" className="fill link">
          <i class="fa-solid fa-user-tie"></i>
          Manage Employees
        </Link>
      </div>
    </div>
  );
}

function SalesGraph() {
  const [graphData, setGraphData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await get("/sales/listSales");
        console.debug("sales data", res.data);
        let x = 0;
        let recent = res.data.slice(-14).map((data) => {
          return { x: (x++ % 7) + 1, y: data.sales };
        });
        if (recent.length == 14) {
          setGraphData([recent.slice(0, 7), recent.slice(7, 14)]);
        } else if (recent.length > 7) {
          setGraphData([recent.slice(0, 7)]);
        } else {
          setGraphData(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);
  if (!graphData) {
    return <div>Not enough data for a plot :(</div>;
  }
  return (
    <div className="canvasContainer">
      <Graph data={graphData} startx={100} endx={50} starty={50} endy={100} />
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
