import { useEffect, useReducer, useState } from "react";
import { get, post } from "../request";

function attendanceReducer(attendance, action) {
  switch (action.type) {
    case "init": {
      return action.attendance;
    }
    case "toggle": {
      return {
        ...attendance,
        entries: attendance.entries.map((entry) => {
          if (entry.userid == action.id) {
            return { ...entry, attendance: !entry.attendance };
          } else return entry;
        }),
      };
    }
    case "setDate": {
      return {
        ...attendance,
        date: action.date,
      };
    }
  }
}

export default function CreateAttendance() {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [attendance, dispatch] = useReducer(attendanceReducer, null);
  const update = () => {
    post("/attendance/submit", attendance)
      .then((res) => alert("saved!"))
      .catch((err) => alert(err.toString()));
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        if (!date) {
          return;
        }
        let res = await get(`/employee/listEmployees`);
        let entries = res.data.map((employee) => {
          return {
            name: `${employee.firstname} ${employee.lastname}`,
            userid: employee._id,
            attendance: false,
          };
        });
        dispatch({
          type: "init",
          attendance: { entries: entries, date: date },
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  if (!attendance || !attendance.entries) return <div>Loading...</div>;

  return (
    <div className="attendance_table col">
      <input
        type="date"
        id="datepicker"
        defaultValue={date}
        onChange={() => {
          setDate(document.querySelector("#datepicker").value);
        }}
      />
      <h2>Attendance</h2>
      <h3>Date: {date}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {attendance.entries.map((entry) => {
            let options = {};
            if (entry.value) {
              options.defaultChecked = true;
            }
            return (
              <tr>
                <td>{entry.name}</td>
                <td>
                  <input
                    type="checkbox"
                    id={entry.id}
                    {...options}
                    onChange={() =>
                      dispatch({ type: "toggle", id: entry.userid })
                    }
                  />
                  {entry.attendance ? "Present" : "Absent"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>{" "}
      <button className="button" onClick={update}>
        Submit
      </button>
      ;
    </div>
  );
}
