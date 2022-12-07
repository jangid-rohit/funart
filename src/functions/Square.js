function reactangle(x, y, ctx, property) {
  console.log(property);
  ctx.beginPath();
  ctx.rect(
    x - property.radius / 2,
    y - property.radius / 2,
    property.radius,
    property.radius
  );
  //ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  //ctx.setLineDash([5, 5]);

  ctx.lineWidth = property.lineThickness;
  ctx.strokeStyle = property.lineColor;

  if (property.lineDots) {
    ctx.setLineDash(property.lineStyle.split(","));
  } else {
    ctx.setLineDash([]);
  }

  if (property.isFilled) {
    ctx.fillStyle = property.fillColor;
    ctx.fill();
  }
  ctx.stroke();
}

export default reactangle;
