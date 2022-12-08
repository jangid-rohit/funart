function reactangle(x, y, ctx, property) {
  ctx.beginPath();

  ctx.save();
  ctx.translate(x, y); //translate to center of shape
  ctx.rotate((Math.PI / 180) * property.rotation); //rotate 25 degrees.

  ctx.translate(-x, -y); //translate center back to 0,0

  ctx.transform(
    1,
    property.hSkew,
    property.vSkew,
    1,
    property.hMove,
    property.vMove
  );

  ctx.rect(
    x - property.radius / 2,
    y - property.radius / 2,
    property.radius,
    property.radius
  );

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
  ctx.restore();
}

export default reactangle;
