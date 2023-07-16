import { useRef, useState } from "react";
import { Nav } from "./components/Nav";
import circle from "./functions/Circle";
import "./App.css";
import reactangle from "./functions/Square";
import triangle from "./functions/Triangle";
import { Box } from "./components/Box";
import { InputNumber } from "./components/InputNumber";
import { InputRange } from "./components/InputRange";
import { InputNumberRange } from "./components/InputNumberRange";

function App() {
  const [property, setProperty] = useState({});

  const [activeId, setActiveId] = useState();

  const canvasRef = useRef(null);

  const draw = (propterties) => {
    const canvas = canvasRef.current;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      propterties.forEach((property) => {
        console.log(property);
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
  };

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
    let id = activeId;

    let newValue = property[id];
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
      case "hSkew":
        newValue.hSkew = e.target.value;
        break;
      case "vSkew":
        newValue.vSkew = e.target.value;
        break;
      case "zIndex":
        id = e.target.className;
        newValue = property[id];
        newValue.zIndex = Number.parseInt(e.target.value);
        break;

      default:
        console.log("Nothing to happen here");
    }

    setProperty({ ...property, [id]: newValue });

    function compareProperties(property1, property2, key) {
      const pro1 = property1[key];
      const pro2 = property2[key];

      if (pro1 < pro2) {
        return -1;
      }
      if (pro1 > pro2) {
        return +1;
      }
      return 0;
    }

    const objects = Object.values(property);
    objects.sort((prop1, prop2) => {
      return compareProperties(prop1, prop2, "zIndex");
    });
    draw(objects);
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
        hMove: 0,
        vMove: 0,
        hSkew: 0,
        vSkew: 0,
        zIndex: 0,
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
        <canvas id="canvas" width="500" height="500" ref={canvasRef}></canvas>
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
                <td>z-index</td>
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
                      <input
                        type="number"
                        name="zIndex"
                        className={key}
                        value={value.zIndex}
                        onChange={change}
                      />
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

          <Box title="fill">
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
          </Box>
          <Box title="radius/width">
            <input
              type="number"
              name="radius"
              value={property[activeId]?.radius}
              onChange={change}
            />
          </Box>
          <Box title="line">
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
          </Box>

          <Box title="rotation">
            <InputNumberRange
              name="rotation"
              range={[-360, 360, 1]}
              value={property[activeId]?.rotation}
              onChange={change}
            />
          </Box>

          <Box title="movement">
            horizontal{" "}
            <InputNumberRange
              name="hMove"
              range={[-1000, 1000, 0.1]}
              value={property[activeId]?.hMove}
              onChange={change}
            />
            vertical{" "}
            <InputNumberRange
              name="vMove"
              range={[-1000, 1000, 0.1]}
              value={property[activeId]?.vMove}
              onChange={change}
            />
          </Box>

          <Box title="skew">
            horizontal{" "}
            <InputNumberRange
              name="hSkew"
              range={[-1000, 1000, 0.1]}
              value={property[activeId]?.hSkew}
              onChange={change}
            />
            vertical{" "}
            <InputNumberRange
              name="vSkew"
              range={[-1000, 1000, 0.1]}
              value={property[activeId]?.vSkew}
              onChange={change}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default App;
