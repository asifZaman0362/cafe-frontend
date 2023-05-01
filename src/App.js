import "./App.css";
import LoginBox from "./pages/login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddUser from "./pages/adduser";
import AttendanceTable from "./pages/editattendance";
import NoPage from "./pages/nopage";
import Header from "./components/header";
import Dashboard from "./pages/dashboard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterBox from "./pages/register";
import {
  CashierDashboard,
  Menu,
  Dashboard as CashierHome,
} from "./pages/cashier";

import { CreateOrder } from "./pages/createOrder.jsx";

function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/attendance" element={<AttendanceTable />} />
        <Route path="/*" element={<NoPage />} />
        <Route path="/cashier" element={<CashierDashboard />}>
          <Route index element={<CashierHome />} />
          <Route path="menu" element={<Menu />} />
          <Route path="createOrder" element={<CreateOrder />} />
        </Route>
      </Routes>
      );
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
          <Header level={user.accessLevel} username={user.username} />
          <Index />
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
            </Routes>
          </BrowserRouter>
        </div>
      );
  }
}

export default App;
