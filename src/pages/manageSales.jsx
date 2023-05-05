import { useEffect, useState } from "react";
import { get } from "../request";
import Graph from "../components/graph.jsx";

let rawData = [
  [
    { x: 0, y: 100 },
    { x: 50, y: 400 },
    { x: 100, y: 100 },
    { x: 150, y: 540 },
    { x: 200, y: 300 },
  ],
  [
    { x: 0, y: 120 },
    { x: 50, y: 330 },
    { x: 100, y: 150 },
    { x: 150, y: 420 },
    { x: 200, y: 400 },
  ],
];

export default function Sales() {
  const [data, setData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await get("/sales/listSales");
        console.debug("sales data", res.data);
        let x = 0;
        let recent = res.data.slice(-14).map((data) => {
          return { x: (x++ % 7) + 1, y: data.sales };
        });
        if (recent.length == 14) {
          setGraphData([recent.slice(0, 7), recent.slice(7, 14)]);
        } else {
          setGraphData([recent]);
        }
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  } else {
    return (
      <div
        className="row fill"
        style={{ alignItems: "start", overflow: "scroll" }}
      >
        <div className="canvasContainer fill full-height">
          <Graph
            data={graphData}
            startx={100}
            endx={50}
            starty={50}
            endy={100}
          />
        </div>
        <div
          className="table-container"
          style={{
            overflow: "scroll",
            flex: "1 1 1px",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <table className="full-height" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Orders Served</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr>
                    <td>{item.date}</td>
                    <td>{item.order_count}</td>
                    <td>{item.sales}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
