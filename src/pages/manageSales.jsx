import axios from "axios";
import Graph from "../components/graph.jsx";
import { useState, useEffect } from "react";

function Sales(props) {
  let graphData = [];
  for (let i = 0; i <= props.data.length > 7 ? 7 : props.data.length; i--) {
    graphData.push({ x: i, y: props.data[i].sales });
  }
  return (
    <div>
      <Graph data={props.data} />
      <div className="sales-record">
        <h1 className="heading">Sales Record</h1>
        <table>
          <tr>
            <th>Date</th>
            <th>Sales</th>
            <th>Spent</th>
            <th>Diff</th>
          </tr>
          {props.data.map((row) => {
            {
              <tr>
                <td>{row.date}</td>
                <td>{row.sales}</td>
                <td>{row.spent}</td>
                <td>{row.diff}</td>
              </tr>;
            }
          })}
        </table>
      </div>
    </div>
  );
}

export default function SalesPage() {
  let [data, setData] = useState(null);
  useEffect(async () => {
    try {
      let res = await axios.get("/listSales", {
        headers: { Authorization: localStorage.getItem("JWT") },
      });
      if (res.status == 200) {
        setData(res);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div class="sales-parent">
      {!data && <div>No Data</div>}
      {data && <Sales data={data}></Sales>}
    </div>
  );
}
