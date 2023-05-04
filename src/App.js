import "./App.css";
import LoginBox from "./pages/login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddUser from "./pages/adduser";
import AttendanceTable from "./pages/editattendance";
import NoPage from "./pages/nopage";
import Header from "./components/header";
import Manager from "./pages/manager.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterBox from "./pages/register";
import { CashierDashboard, Dashboard as CashierHome } from "./pages/cashier";
import Inventory from "./pages/inventory.jsx";
import AddEmployee from "./pages/addEmployee.jsx";
import EmployeeManager from "./pages/manageEmployees.jsx";
import Sales from "./pages/manageSales.jsx";
import ManageAccess from "./pages/manageAccess.jsx";
import Menu from "./pages/menu.jsx";
import Dashboard from "./pages/dashboard.jsx";

import { CreateOrder } from "./pages/createOrder.jsx";
import AddItem from "./pages/addItem";
import { Orders } from "./pages/orders";
import ListOrders from "./pages/listOrders";

function clearToken(userHook) {
  userHook(null);
  localStorage.removeItem("JWT");
  window.location.replace("/");
}

function Redirect({ manager }) {
  useEffect(() => {
    if (manager) window.location.replace("manager");
    else window.location.replace("cashier");
  }, []);
  return <></>;
}

function Index({ manager }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Redirect manager={manager} />} />
        <Route path="/manager" element={<Manager manager={manager} />}>
          <Route
            index
            element={
              <Dashboard
                items={[
                  { change: "positive", amount: 24, name: "Potatoes" },
                  { change: "negative", amount: 4, name: "Tomatoes" },
                  { change: "negative", amount: 7, name: "Chicken" },
                  { change: "positive", amount: 10, name: "Garlic" },
                ]}
                attendance={{ in: 24, out: 2 }}
              />
            }
          />
          <Route path="menu" element={<Menu edit={true} />} />
          <Route path="addItem" element={<AddItem />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="access" element={<ManageAccess />} />
          <Route path="addUser" element={<AddUser />} />
          <Route path="addEmployee" element={<AddEmployee />} />
          <Route path="listEmployees" element={<EmployeeManager />} />
          <Route path="attendance" element={<AttendanceTable />} />
          <Route path="sales" element={<Sales />} />
        </Route>
        <Route path="/cashier" element={<CashierDashboard manager={manager} />}>
          <Route index element={<CashierHome />} />
          <Route path="createOrder" element={<CreateOrder />} />
          <Route path="menu" element={<Menu edit={false} />} />
          <Route path="order/:orderId" element={<Orders />} />
          <Route path="viewOrders" element={<ListOrders />} />
        </Route>
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  let [tried, setTried] = useState(false);
  let [user, setUser] = useState(null);

  useEffect(() => {
    async function validate() {
      try {
        const response = await axios.get("/auth/validateToken", {
          headers: {
            Authorization: localStorage.getItem("JWT"),
          },
        });
        setUser(response.data);
        setTried(true);
      } catch (error) {
        setTried(true);
      }
    }
    validate();
  }, []);

  if (!tried) {
    return <div>Loading...</div>;
  } else {
    if (user) {
      return (
        <div className="full">
          <Header
            level={user.accessLevel}
            username={user.username}
            setToken={() => clearToken(setUser)}
          />
          <Index manager={user.accessLevel == "Manager"} />
        </div>
      );
    } else
      return (
        <div className="full">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route index element={<LoginBox setToken={setUser} />} />
              <Route
                path="/register"
                element={<RegisterBox setToken={setUser} />}
              />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      );
  }
}

export default App;
