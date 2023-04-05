function Dashboard(props) {
  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">Manager</h1>
      <div className="dashboard-grid">
        <div className="continuous-container sidebar">
          <InventoryOverview recent={props.inventory} />
          <Divider />
          <IconButtonLarge onclick="" text="" />
        </div>
      </div>
      <div className="attendance-overview"></div>
      <div className="continuous-container horizontal">
        <IconButtonLarge onclick="" text="" />
        <Divider />
        <IconButtonLarge onclick="" text="" />
      </div>
    </div>
  );
}

function AttendanceOverview(props) {
  return (
    <section className="attendance-overview">
      <h1 className="section-header">Staff Attendance</h1>
      <div className="horizontal halves">
        <div className="half">
          <p className="label">In today</p>
          <span className="attendance-number positive">{props.present}</span>
        </div>
        <div className="half">
          <p className="label">Missing work</p>
          <span className="attendance-number negative">{props.absent}</span>
        </div>
      </div>
      <div className="button-bar">
        <button className="generic-button">Browse records</button>
        <button className="generic-button">Take attendance</button>
      </div>
      <Graph data={props.data} />
    </section>
  );
}

function Graph(props) {
  return <canvas className="graph"></canvas>;
}

function Divider() {
  return <hr />;
}

function InventoryOverview(props) {
  return (
    <section id="inventory">
      <h1 className="section-heading">Inventory</h1>
      <div className="section-inner">
        <h4 className="inner-heading">Recent updates</h4>
        <ul className="update-list">
          {props.recent.map((item) => (
            <li key={item.id}>
              <h3 className="inventory-item-name">{item.name}</h3>
              <h2
                className={
                  "inventory-item-change-amount " + item.change_positive
                    ? "positive"
                    : "negative"
                }
              >
                {item.change}
              </h2>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
