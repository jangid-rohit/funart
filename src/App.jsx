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
    
    
    if (e.target.name == "color") {
      newValue.color = e.target.value;
    } else if (e.target.name == "radius") {
      newValue.radius = Number.parseInt(e.target.value);
    } else if (e.target.name == "isFilled") {
      newValue.isFilled = e.target.checked;
    } else if (e.target.name == "visible") {
       newValue.isVisible = e.target.checked;
    } else if (e.target.name == "lineThickness") {
      newValue.lineThickness = e.target.value;
    }
    else if (e.target.name == "fillColor") {
      newValue.fillColor = e.target.value;
    }
    else if (e.target.name == "lineColor") {
      newValue.lineColor = e.target.value;
    }
    else if (e.target.name == "lineDots") {
      console.log(e.target.checked);
      console.log(newValue);
      newValue.lineDots = e.target.checked;
      console.log(newValue);
    }
    else if (e.target.name == "lineStyle") {
      newValue.lineStyle = e.target.value;
    }
    setProperty({ ...property, [id]: newValue });

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
              value={property[activeId]?.isFilled}
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
              value={property[activeId]?.lineDots}
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
        </div>
      </div>
    </div>
  );
}

export default App;
