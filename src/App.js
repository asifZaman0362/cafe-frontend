import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUserPage from "./pages/adduser";
import AttendanceTable from "./pages/editattendance";

let entries = [
  {
    value: true,
    name: "Rose Tyler",
    id: "companion1"
  },
  {
    value: false,
    name: "Micky Smith",
    id: "companion2"
  },
  {
    value: true,
    name: "Jack Harkness",
    id: "companion3"
  },
  {
    value: true,
    name: "Martha Jones",
    id: "companion4"
  },
  {
    value: true,
    name: "Donna Noble",
    id: "companion5"
  },
  {
    value: true,
    name: "Amelia Pond",
    id: "companion6"
  },
  {
    value: true,
    name: "Rory Williams",
    id: "companion7"
  },
  {
    value: true,
    name: "Clara Oswald",
    id: "companion9"
  },
  {
    value: true,
    name: "Bill Potts",
    id: "companion10"
  },
  {
    value: true,
    name: "Nardole",
    id: "companion11"
  },
  {
    value: true,
    name: "Yasmin Khan",
    id: "companion12"
  },
  {
    value: true,
    name: "Ryan Sinclair",
    id: "companion13"
  },
  {
    value: true,
    name: "Graham O'Brien",
    id: "companion14"
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/adduser" element={<AddUserPage />} />
        <Route path="/attendance" element={<AttendanceTable date="10-10-2010" entries={entries} edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
