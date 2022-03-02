import { Modal } from "@arco-design/web-react";
import { useState } from "react";
import { SketchPicker } from "react-color";

export default function () {
  const [visible, setVisible] = useState(false);

  const [hexVisible, setHexVisible] = useState(false);
  const [alphaVisible, setAlphaVisible] = useState(false);

  const ColorEditor = () => {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{ width: "18px", height: "18px", backgroundColor: "#000" }}
        ></div>
        <div style={{ marginLeft: "8px" }}>000000</div>
        <div style={{ marginLeft: "8px" }}>100%</div>
      </div>
    );
  };

  return (
    <div style={{ marginLeft: "16px" }}>
      <div style={{ display: "flex" }}>
        <div
          onClick={() => setVisible(true)}
          style={{ width: "18px", height: "18px", backgroundColor: "#000" }}
        ></div>
        {visible && (
          <>
            <div style={{ position: "absolute", zIndex: 2 }}>
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0",
                  bottom: "0px",
                  left: "0px",
                }}
              />
              <SketchPicker />
            </div>
          </>
        )}
        <div style={{ marginLeft: "8px" }}>000000</div>
        <div style={{ marginLeft: "8px" }}>100%</div>
      </div>
    </div>
  );
}
