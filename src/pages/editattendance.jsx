import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { get } from "../request";

function attendanceReducer(attendance, action) {
  switch (action.type) {
    case "init": {
      return action.attendance;
    }
    case "toggle": {
      return {
        ...attendance,
        entries: attendance.entries.map((entry) => {
          if (entry.id == action.id) {
            return { ...entry, present: !entry.present };
          } else return entry;
        }),
      };
    }
  }
}

export default function AttendanceTable() {
  const { recordId } = useParams("id");
  const [attendance, dispatch] = useReducer(attendanceReducer, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await get(`/attendance/getRecord?id=${recordId}`);
        dispatch({ type: "init", attendance: res.data });
      } catch (error) {
        console.error(error);
      }
      fetch();
    };
  }, [recordId]);

  return (
    <div className="attendance_table">
      <h2>Attendance</h2>
      <h3>Date: {attendance.date}</h3>
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
                    onChange={() => dispatch({ type: "toggle", id: entry.id })}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>{" "}
      {getButton(true)}
    </div>
  );
}

function getButton(show) {
  if (show) return <button className="button">Submit</button>;
  else return null;
}
