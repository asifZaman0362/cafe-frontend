import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EmployeeManager() {
  let [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await axios.get("/employee/listEmployees", {
          headers: {
            Authorization: localStorage.getItem("JWT"),
          },
        });
        if (res.status == 200) {
          console.debug("got attendance records: ", data);
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  if (!data) {
    return <div>No Employee records found!</div>;
  } else {
    return (
      <div className="employee-records">
        <h1 className="module-heading">Manage Employees</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
          {data.map((employee) => {
            <tr>
              <td>
                {employee.firstname} {employee.lastname}
              </td>
              <td>{employee.adress}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
            </tr>;
          })}
          <tr>
            <Link className="button" to="/addEmployee">
              Add Employee
            </Link>
          </tr>
        </table>
      </div>
    );
  }
}