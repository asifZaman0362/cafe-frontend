import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ManageAccess() {
  let [data, setData] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await axios.get("/access/listUsers", {
          headers: { Authorization: localStorage.getItem("JWT") },
        });
        if (res.status == 200) {
          setData(res.data);
          console.debug(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  if (!data) {
    return (
      <div>
        <div>No Records!</div>
        <Link to="/addUser" className="button">
          Add User
        </Link>
      </div>
    );
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row._id}>
                <td>{row.username}</td>
                <td>{row.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
