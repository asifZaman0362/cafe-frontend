import "./App.css";
import LoginBox from "./pages/login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddUser from "./pages/adduser";
import AttendanceTable from "./pages/editattendance";
import NoPage from "./pages/nopage";
import Header from "./components/header";
import Dashboard from "./pages/dashboard";
import React, { useState } from "react";
import axios, { HttpStatusCode } from "axios";
import RegisterBox from "./pages/register";
import {
  CashierDashboard,
  Menu,
  Dashboard as CashierHome,
} from "./pages/cashier";

import { CreateOrder } from "./pages/createOrder.jsx";

function Index(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              user={props.token.username}
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
  let [token, setToken] = useState(localStorage.getItem("JWT"));
  let auth = localStorage.getItem("JWT");
  console.log(auth);
  axios
    .get("/auth/validateToken", {
      headers: {
        Authorization: localStorage.getItem("JWT"),
      },
    })
    .then((res) => {})
    .catch((err) => {
      if (err.status == HttpStatusCode.Unauthorized) {
        setToken(null);
        localStorage.removeItem("JWT");
      }
      console.error(err);
    });
  if (token == null) {
    return (
      <div className="full">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginBox setToken={setToken} />} />
            <Route
              path="/register"
              element={<RegisterBox setToken={setToken} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="full">
        <Header />
        <Index token={token} setToken={setToken} />
      </div>
    );
  }
}

export default App;
