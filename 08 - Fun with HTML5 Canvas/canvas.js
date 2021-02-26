"use strict";

let canvas = document.getElementById("draw");
let ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let isGrowingWidth = false;

ctx.strokeStyle = "#ff3456";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 200;

canvas.addEventListener("mousedown", (e) => {
  let lastX = e.x;
  let lastY = e.y;

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  function draw(e) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    lastX = e.clientX;
    lastY = e.clientY;

    isGrowingWidth ? ++ctx.lineWidth : --ctx.lineWidth;
    if (ctx.lineWidth <= 1 || ctx.lineWidth >= 200) isGrowingWidth = !isGrowingWidth;

    ctx.strokeStyle = `hsl(${ctx.lineWidth}, 100%, 40%)`;
  }
  function stopDrawing() {
    canvas.removeEventListener("mouseup", stopDrawing);
    canvas.removeEventListener("mousemove", draw);
  }
});
