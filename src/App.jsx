import { useState } from "react";
import { Nav } from "./components/Nav";
import circle from "./functions/Circle";
import "./App.css";
import reactangle from "./functions/Square";
import triangle from "./functions/Triangle";

function draw(propterties) {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    propterties.forEach((property) => {
      if (property.isVisible) {
        if (property.shape === "circle") {
          circle(x, y, ctx, property);
        } else if (property.shape === "square") {
          reactangle(x, y, ctx, property);
        } else if (property.shape === "triangle") {
          triangle(x, y, ctx, property);
        }
      }
    });
  }
}

function App() {
  const [property, setProperty] = useState({});

  const [activeId, setActiveId] = useState();

  const activeShape = (e) => {
    setActiveId((p) => {
      if (p) {
        const td = document.querySelectorAll('[id="' + p + '"]')[0];
        td.style.backgroundColor = "";
      }
      const id = e.target.id;
      e.target.style.backgroundColor = "blue";
      return id;
    });
  };
  const change = (e) => {
    const id = activeId;

    let newValue = property[id];
    console.log(property);

    switch (e.target.name) {
      case "radius":
        newValue.radius = Number.parseInt(e.target.value);
        break;
      case "isFilled":
        newValue.isFilled = e.target.checked;
        break;
      case "visible":
        newValue.isVisible = e.target.checked;
        break;
      case "lineThickness":
        newValue.lineThickness = e.target.value;
        break;
      case "fillColor":
        newValue.fillColor = e.target.value;
        break;
      case "lineColor":
        newValue.lineColor = e.target.value;
        break;
      case "lineDots":
        newValue.lineDots = e.target.checked;
        break;
      case "lineStyle":
        newValue.lineStyle = e.target.value;
        break;
      case "rotation":
          newValue.rotation = e.target.value;
        break;
       case "hMove":
           newValue.hMove = e.target.value;
           break;
        case "vMove":
              newValue.vMove = e.target.value;
              break;

        
        
    }
    setProperty({ ...property, [id]: newValue });
    console.log(newValue);
    draw(Object.values(property));
  };

  const inputs = (e) => {
    const id = e.target.id;
    const defaultProperty = {
      [Date.now()]: {
        radius: 0,
        isFilled: false,
        fillColor: "#000000",
        shape: id,
        isVisible: true,
        lineColor: "#000000",
        lineThickness: 1,
        lineDots: false,
        lineStyle: "",
        rotation: 0,
        hMove:0,
        vMove:0
      },
    };
    setProperty({ ...property, ...defaultProperty });
  };

  const deleteMe = (e) => {
    const id = e.target.id;

    const updatedProperties = property;
    delete updatedProperties[id];

    setProperty({ ...updatedProperties });

    draw(Object.values(property));
  };

  const randomColor = () => {
    return (
      "rgba(" +
      Number.parseInt(Math.random() * 255) +
      "," +
      Number.parseInt(Math.random() * 255) +
      "," +
      Number.parseInt(Math.random() * 255) +
      ",0.4)"
    );
  };

  return (
    <div className="App">
      <Nav />
      <div className="art-portion">
        <canvas id="canvas" width="500" height="500"></canvas>
      </div>
      <div className="side-bar">
        <div>
          <button onClick={inputs} id="circle">
            Add Circle
          </button>
          <button onClick={inputs} id="square">
            Add Square
          </button>
          <button onClick={inputs} id="triangle" hidden>
            Add Triangle
          </button>
        </div>

        <div>
          <table border={1}>
            <thead>
              <tr>
                <td>Show</td>
                <td>Shape</td>
                <td>delete</td>
              </tr>
            </thead>
            <tbody>
              {Object.entries(property).map(([key, value]) => {
                return (
                  <tr key={key}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={change}
                        value={value.isVisible}
                        name="visible"
                        checked={value.isVisible}
                      />
                    </td>
                    <td onClick={activeShape} id={key}>
                      {value.shape}
                    </td>

                    <td>
                      <button onClick={deleteMe} id={key} name="deleteMe">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="side-bar-bottom">
          <h3>Properties</h3>

          <span>
            filled{" "}
            <input
              type="checkbox"
              name="isFilled"
              checked={property[activeId]?.isFilled}
              onChange={change}
            />
            fill color{" "}
            <input
              type="color"
              name="fillColor"
              value={property[activeId]?.fillColor}
              onChange={change}
            />
          </span>
          <span>
            radius{" "}
            <input
              type="number"
              name="radius"
              value={property[activeId]?.radius}
              onChange={change}
            />
          </span>
          <span>
            line color{" "}
            <input
              type="color"
              name="lineColor"
              value={property[activeId]?.lineColor}
              onChange={change}
            />
            line thickness{" "}
            <input
              type="number"
              name="lineThickness"
              value={property[activeId]?.lineThickness}
              onChange={change}
            />
          </span>
          <span>
            line dots{" "}
            <input
              type="checkbox"
              name="lineDots"
              checked={property[activeId]?.lineDots}
              onChange={change}
            />
            line style{" "}
            <input
              type="text"
              name="lineStyle"
              value={property[activeId]?.lineStyle}
              onChange={change}
            />
          </span>
          <span>
          rotation{" "}
            <input
              type="number"
              name="rotation"
              value={property[activeId]?.rotation}
              onChange={change}
            />
          </span>
          <span>
          h-move{" "}
            <input
              type="number"
              name="hMove"
              value={property[activeId]?.hMove}
              onChange={change}
            />
          </span>
          <span>
          v-move{" "}
            <input
              type="number"
              name="vMove"
              value={property[activeId]?.vMove}
              onChange={change}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
