import React from "react";

let config = {
  STROKE_SIZE_NORMAL: 5,
  STROKE_SIZE_HOVERED: 8,
  COLOR_LINE_NORMAL_GHOST: "#247994",
  COLOR_LINE_HOVERED_GHOST: "#3292B0",
  COLOR_LINE_NORMAL: "#83C2D7",
  COLOR_LINE_HOVERED: "#5CAFCA",
  POINT_SIZE_NORMAL: 10,
  POINT_SIZE_HOVERED: 15,
  TEXT_SIZE: 20,
  FONT: "sans-serif",
};

class GraphPoint {
  x;
  y;
  data;
  hovered;
}

class Point {
  x;
  y;
}

class LineSegment {
  start;
  end;
}

class PolyLine {
  points;
  hovered;
  color;
  hovercolor;
}

function drawLine(ctx, line, hovered) {
  let [color, width] = ["", 0];
  if (hovered) {
    color = line.hov;
    width = config.STROKE_SIZE_HOVERED;
  } else {
    color = line.col;
    width = config.STROKE_SIZE_NORMAL;
  }
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(line.start.x, line.start.y);
  ctx.lineTo(line.end.x, line.end.y);
  ctx.stroke();
}

function drawPoint(ctx, point, normal, hover) {
  let dpi = window.devicePixelRatio;
  let [color, radius] = ["", 0];
  if (point.hovered) {
    color = hover;
    radius = config.POINT_SIZE_NORMAL;
    ctx.beginPath();
    const [x, y] = [point.data.x, point.data.y];
    const textSize = ctx.measureText(`${x}, ${y}`);
    const boxWidth = textSize.width + 10;
    const boxHeight = Math.floor(25 * dpi);
    ctx.roundRect(
      point.x - boxWidth / 2,
      point.y - boxHeight / 2 - 30,
      boxWidth,
      boxHeight,
      Math.floor(10 * dpi)
    );
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(`${y}`, point.x, point.y - 30);
    ctx.lineWidth = 1;
  } else {
    color = normal;
    radius = config.POINT_SIZE_NORMAL;
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(point.x, point.y, radius, radius, 0, 0, Math.PI * 2);
  ctx.fill();
}

function distanceLine(point, line) {
  let [x0, y0, x, y, x1, y1] = [
    line.start.x,
    line.start.y,
    line.end.x,
    line.end.y,
    point.x,
    point.y,
  ];
  const numerator = Math.abs((y1 - y0) * x - (x1 - x0) * y + x1 * y0 - y1 * x0);
  const denominator = Math.sqrt((y1 - y0) ** 2 + (x1 - x0) ** 2);
  return numerator / denominator;
}

function drawLineCustom(ctx, start, end, color, width) {
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

function isLineHovered(line, mouse) {
  let dpi = window.devicePixelRatio;
  if (
    mouse.x > Math.max(line.start.x, line.end.x) ||
    mouse.x < Math.min(line.start.x, line.end.x) ||
    mouse.y > Math.max(line.start.y, line.end.y) ||
    mouse.y < Math.min(line.start.y, line.end.y)
  )
    return false;
  let threshold = 15;
  return distanceLine(mouse, line) <= Math.floor(threshold * dpi);
}

function checkForHover(mousePos, data) {
  let found = false;
  for (let line of data) {
    for (let point of line.points) {
      if (found) point.hovered = false;
      else if (isPointHovered(point, mousePos)) {
        point.hovered = true;
        found = true;
      } else point.hovered = false;
    }
  }
  for (let line of data) {
    if (line.points.length == 0) continue;
    let prev = line.points[0];
    for (let point of line.points.slice(1)) {
      if (found) line.hovered = false;
      else if (isLineHovered({ start: prev, end: point }, mousePos)) {
        found = true;
        line.hovered = true;
        break;
      } else line.hovered = false;
      prev = point;
    }
  }
  return data;
}

function distance(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function transformData(data, startx, starty, width, height) {
  let transformed = [];
  if (data.length == 0 || data[0].length == 0) return transformed;
  let max = { x: 0, y: 0 };
  let min = { x: data[0][0].x, y: data[0][0].y };
  for (let line of data) {
    for (let point of line) {
      if (point.x > max.x) max.x = point.x;
      else if (point.x < min.x) min.x = point.x;
      if (point.y > max.y) max.y = point.y;
      else if (point.y < min.y) min.y = point.y;
    }
  }
  let xfactor = (max.x - min.x) / width;
  let yfactor = (max.y - min.y) / height;
  for (let line of data) {
    let newLine = new PolyLine();
    newLine.points = [];
    for (let point of line) {
      newLine.points.push({
        x: (point.x - min.x) / xfactor + startx,
        y: height - ((point.y - min.y) / yfactor - starty),
        data: point,
        hovered: false,
      });
    }
    transformed.push(newLine);
  }
  return {
    transformed: transformed,
    datastartx: min.x,
    datastarty: min.y,
    dataheight: max.y - min.y,
    datawidth: max.x - min.x,
  };
}

function drawAxes(
  ctx,
  startx,
  endx,
  lineWidth,
  offsetx,
  intervalsx,
  labelx,
  starty,
  endy,
  offsety,
  intervalsy,
  labely,
  width_data,
  data_start_x,
  height_data,
  data_start_y
) {
  // draw y axis
  drawLineCustom(
    ctx,
    { x: startx + offsetx, y: starty + offsety },
    { x: startx + offsetx, y: endy + offsety },
    "#20946A",
    lineWidth
  );
  // draw y axis label
  ctx.font = `${config.TEXT_SIZE}px ${config.FONT}`;
  ctx.save();
  ctx.translate(40, (endy - starty) / 2 + starty);
  ctx.rotate(Math.PI * 1.5);
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(labely, 0, 0);
  ctx.restore();
  // draw x axis
  drawLineCustom(
    ctx,
    { x: startx + offsetx, y: endy },
    { x: endx + offsetx, y: endy },
    "#B11818",
    lineWidth
  );
  // draw x axis label
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(labelx, (endx - startx) / 2 + startx, endy + 50);
  let dx = width_data / intervalsx;
  let dy = height_data / intervalsy;
  for (let x = 0; x <= intervalsx; x++) {
    let xpos = (x * (endx - startx)) / intervalsx + startx;
    let data_point_x = dx * x + data_start_x;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(data_point_x.toString(), xpos, endy + 10);
  }
  for (let y = 0; y < intervalsy; y++) {
    let ypos = (y * (endy - starty)) / intervalsy + starty;
    let data_point_y = height_data - y * dy + data_start_y;
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(data_point_y.toString(), startx - 10, ypos);
    drawLineCustom(
      ctx,
      { x: startx + offsetx, y: ypos + offsety },
      { x: endx + offsetx, y: ypos + offsety },
      y == 0 ? "gray" : "gray",
      1
    );
  }
}

function draw(
  ctx,
  data,
  width,
  height,
  startx,
  endx,
  starty,
  endy,
  data_width,
  data_height,
  startx_data,
  starty_data
) {
  ctx.clearRect(0, 0, width, height);
  drawAxes(
    ctx,
    startx,
    width - endx,
    5,
    0,
    6,
    "time",
    starty,
    height - endy,
    0,
    5,
    "sales",
    data_width,
    startx_data,
    data_height,
    starty_data
  );
  for (let line of data) {
    if (line.points.length == 0) continue;
    let prev = line.points[0];
    for (let point of line.points.slice(1)) {
      drawLine(
        ctx,
        { start: prev, end: point, col: line.color, hov: line.hovercolor },
        line.hovered
      );
      prev = point;
    }
  }
  for (let line of data) {
    if (line.points.length == 0) continue;
    for (let point of line.points) {
      drawPoint(ctx, point, line.color, line.hovercolor);
    }
  }
}

function isPointHovered(point, mouse) {
  let dpi = window.devicePixelRatio;
  let radius = point.hovered
    ? config.POINT_SIZE_HOVERED
    : config.POINT_SIZE_NORMAL;
  return distance(point, mouse) <= Math.floor(radius * dpi);
}

function getMousePosition(canvas, event) {
  let dpi = window.devicePixelRatio;
  var rect = canvas.getBoundingClientRect();
  return {
    x: (Math.floor(event.clientX) - rect.left) * dpi,
    y: (Math.floor(event.clientY) - rect.top) * dpi,
  };
}

const Graph = ({ data, startx = 150, endx = 50, starty = 50, endy = 150 }) => {
  const canvas = React.useRef(); // ADDED

  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    if (canvas.current == null) return;
    let dpi = window.devicePixelRatio;
    const context = canvas.current.getContext("2d");
    let display_height = canvas.current.clientHeight;
    let display_width = canvas.current.clientWidth;
    let height = Math.floor(display_height * dpi);
    let width = Math.floor(display_width * dpi);
    canvas.current.height = height;
    canvas.current.width = width;
    canvas.current.style.height = display_height + "px";
    canvas.current.style.width = display_width + "px";

    let { transformed, datastartx, datastarty, dataheight, datawidth } =
      transformData(
        data,
        startx,
        starty,
        width - (startx + endx),
        height - (starty + endy)
      );

    transformed = checkForHover(mousePos, transformed);
    transformed[0].color = config.COLOR_LINE_NORMAL;
    transformed[0].hovercolor = config.COLOR_LINE_HOVERED;
    if (transformed.length == 2) {
      transformed[1].color = config.COLOR_LINE_NORMAL_GHOST;
      transformed[1].hovercolor = config.COLOR_LINE_HOVERED_GHOST;
    }

    draw(
      context,
      transformed,
      width,
      height,
      startx,
      endx,
      starty,
      endy,
      datawidth,
      dataheight,
      datastartx,
      datastarty
    );
    function handleMouseMove(event) {
      if (canvas.current == null) return;
      const mousePos = getMousePosition(canvas.current, event);
      let display_height = canvas.current.clientHeight;
      let display_width = canvas.current.clientWidth;
      let height = Math.floor(display_height * dpi);
      let width = Math.floor(display_width * dpi);
      canvas.current.height = height;
      canvas.current.width = width;
      canvas.current.style.height = display_height + "px";
      canvas.current.style.width = display_width + "px";
      transformed = checkForHover(mousePos, transformed);
      transformed[0].color = config.COLOR_LINE_NORMAL;
      transformed[0].hovercolor = config.COLOR_LINE_HOVERED;
      if (transformed.length == 2) {
        transformed[1].color = config.COLOR_LINE_NORMAL_GHOST;
        transformed[1].hovercolor = config.COLOR_LINE_HOVERED_GHOST;
      }

      draw(
        context,
        transformed,
        width,
        height,
        startx,
        endx,
        starty,
        endy,
        datawidth,
        dataheight,
        datastartx,
        datastarty
      );
    }

    canvas.current.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (!canvas.current) return;
      canvas.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvas} // ADDED
    />
  );
};

export default Graph;
