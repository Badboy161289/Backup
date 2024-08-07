import React, { useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

export default function Signature({ setSignatureImage }) {
  const [sign, setSign] = useState();

  function handleClear() {
    sign.clear();
    setSignatureImage(""); // Clear signature image in parent
  }

  function handleSave() {
    const signatureURL = sign.getTrimmedCanvas().toDataURL("image/png");
    setSignatureImage(signatureURL);
    alert('Signature Saved and added to PDF')
  }

  return (
    <div style={{ border: "2px solid black", width: 300, height: 200, margin: "auto" }}>
      <ReactSignatureCanvas
        canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        ref={(data) => setSign(data)}
      />
      <button onClick={handleClear}>Clear Pad</button>
      <button onClick={handleSave}>Save Pad</button>
      <br />
      <br />
      {/* <img  src={sign && sign.getTrimmedCanvas().toDataURL("image/png")} alt="signature preview" /> */}
    </div>
  );
}
