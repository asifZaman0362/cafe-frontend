export default function AttendanceTable(props) {
  if (!props.entries) return <div>No Records!</div>;
  return (
    <div className="attendance_table">
      <h2>Attendance</h2>
      <h3>Date: {props.date}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {props.entries.map((entry) => {
            let options = {};
            if (!props.edit) {
              options.disabled = true;
            }
            if (entry.value) {
              options.defaultChecked = true;
            }
            return (
              <tr>
                <td>{entry.name}</td>
                <td>
                  <input type="checkbox" id={entry.id} {...options} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>{" "}
      {getButton(props.edit)}
    </div>
  );
}

function getButton(show) {
  if (show) return <button className="button">Submit</button>;
  else return null;
}
