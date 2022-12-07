function circle(x, y, ctx, property) {
    ctx.beginPath();
    ctx.arc(x, y, property.radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = property.lineThickness;
        ctx.strokeStyle = property.lineColor;

    if(property.lineDots){
        
        ctx.setLineDash(property.lineStyle.split(","));
    }
    else{
    ctx.setLineDash([]);
    }
  
    if (property.isFilled) {
      ctx.fillStyle = property.fillColor;
      ctx.fill();
    }
    ctx.stroke();
  }

export default circle;