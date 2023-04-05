import logo from "./logo.svg";
import "./App.css";
import LoginBox from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./pages/adduser";
import AttendanceTable from "./pages/editattendance";
import NoPage from "./pages/nopage";
import Header from "./components/header";
import Dashboard from "./pages/dashboard";
import React, { useState } from "react";

let entries = [
  {
    value: true,
    name: "Rose Tyler",
    id: "companion1",
  },
  {
    value: false,
    name: "Micky Smith",
    id: "companion2",
  },
  {
    value: true,
    name: "Jack Harkness",
    id: "companion3",
  },
  {
    value: true,
    name: "Martha Jones",
    id: "companion4",
  },
  {
    value: true,
    name: "Donna Noble",
    id: "companion5",
  },
  {
    value: true,
    name: "Amelia Pond",
    id: "companion6",
  },
  {
    value: true,
    name: "Rory Williams",
    id: "companion7",
  },
  {
    value: true,
    name: "Clara Oswald",
    id: "companion9",
  },
  {
    value: true,
    name: "Bill Potts",
    id: "companion10",
  },
  {
    value: true,
    name: "Nardole",
    id: "companion11",
  },
  {
    value: true,
    name: "Yasmin Khan",
    id: "companion12",
  },
  {
    value: true,
    name: "Ryan Sinclair",
    id: "companion13",
  },
  {
    value: true,
    name: "Graham O'Brien",
    id: "companion14",
  },
];

function Index(props) {
  if (!props.token) {
    return <LoginBox setToken={props.setToken} />;
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard user={props.token.user} />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route
            path="/attendance"
            element={
              <AttendanceTable date="10-10-2010" entries={entries} edit />
            }
          />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

function App() {
  let [token, setToken] = useState(localStorage.getItem("JWT"));
  return (
    <div className="full">
      <Header />
      <Index token={token} setToken={setToken} />
    </div>
  );
}

export default App;
