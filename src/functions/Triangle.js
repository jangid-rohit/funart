function triangle(x, y, ctx, property) {
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(50, 0);
    ctx.lineTo(100, 50);
    ctx.lineTo(0, 50);
  
    ctx.lineWidth = 1;
    ctx.strokeStyle = property.color;
    if (isFilled) {
      ctx.fillStyle = property.color;
      ctx.fill();
    }
    ctx.stroke();
    ctx.closePath();
  }

  export default triangle;