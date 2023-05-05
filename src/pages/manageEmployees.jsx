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
          console.debug("", res.data);
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
      <div
        className="employee-records"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h1 className="module-heading">Manage Employees</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.length == 0 && (
              <tr>
                <td colSpan="4">No Records!</td>
              </tr>
            )}
            {data.map((employee) => {
              return (
                <tr>
                  <td>
                    {employee.firstname} {employee.lastname}
                  </td>
                  <td>{employee.address}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.emailId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link className="button" to="../addEmployee" style={{ margin: "40px" }}>
          Add Employee
        </Link>
      </div>
    );
  }
}
