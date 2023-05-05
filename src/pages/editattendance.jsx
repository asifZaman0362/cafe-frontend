import { useEffect, useReducer, useState } from "react";
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
  const [date, setDate] = useState(null);
  const [attendance, dispatch] = useReducer(attendanceReducer, null);
  useEffect(() => {
    const fetch = async () => {
      try {
        if (!date) {
          return;
        }
        let res = await get(`/attendance/getRecord/${date}`);
        console.debug("attendance data: ", res.data);
        dispatch({ type: "init", attendance: res.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [date]);

  if (!attendance)
    return (
      <div className="attendance_table">
        <div className="col">
          <div>
            <label htmlFor="date" class="dateLabel">
              Select Date:{" "}
            </label>
            <input
              type="date"
              id="datepicker"
              name="date"
              onChange={() => {
                setDate(document.querySelector("#datepicker").value);
              }}
              defaultValue={date}
            />
          </div>
        </div>
        <div>No Records!</div>
      </div>
    );

  return (
    <div className="attendance_table col">
      <div className="col">
        <div>
          <label htmlFor="date" class="dateLabel">
            Select Date:{" "}
          </label>
          <input
            type="date"
            id="datepicker"
            name="date"
            onChange={() => {
              setDate(document.querySelector("#datepicker").value);
            }}
            defaultValue={date}
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {attendance.entries.map((entry) => {
            let options = {};
            if (entry.attendance) {
              options.present = "Present";
            } else options.present = "Absent";
            return (
              <tr>
                <td>{entry.name}</td>
                <td>{options.present}</td>
              </tr>
            );
          })}
        </tbody>
      </table>{" "}
    </div>
  );
}
