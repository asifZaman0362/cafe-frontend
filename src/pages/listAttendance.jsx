import { useEffect, useState } from "react-router-dom";
import { get } from "../request";

export default function ListAttendance() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await get("/attendance/listAttendance");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  } else {
    <div className="attendance-list-container">
      <h1>Attendance</h1>
      <table>
        <thead>
          <tr>
            <th>Attendance ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => {
            <tr key={entry.id}>
              <td>
                <Link to={`attendance/${entry.id}`}>{entry.id}</Link>
              </td>
              <td>{entry.date}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>;
  }
}
