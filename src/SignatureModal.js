import React, { useRef, useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SignatureModal = ({
  showModal,
  handleClose,
  signatureName,
  handleSignatureNameChange,
  addSignature,
  setSignatureImage,
  signatureOption,
  setSignatureOption,
}) => {
  const [imagePreview, setImagePreview] = useState("");
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);

  // Initialize canvas context when the modal is shown
  useEffect(() => {
    if (showModal && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.lineWidth = 4;
      context.lineCap = "round";
      context.strokeStyle = "#000";
    }
  }, [showModal]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureImage(reader.result);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    context.beginPath();
    context.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    context.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    context.stroke();
  };

  const stopDrawing = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.closePath();
      setDrawing(false);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      setSignatureImage(dataURL);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Signature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSignatureName">
            <Form.Label>Signature Name</Form.Label>
            <Form.Control
              type="text"
              value={signatureName}
              onChange={handleSignatureNameChange}
              placeholder="Enter your name"
            />
          </Form.Group>
          <Form.Group controlId="formSignatureOption">
            <Form.Label>Select Signature Type</Form.Label>
            <Form.Check
              type="radio"
              label="Digital Signature"
              checked={signatureOption === "digital"}
              onChange={() => setSignatureOption("digital")}
            />
            <Form.Check
              type="radio"
              label="Signature Image"
              checked={signatureOption === "image"}
              onChange={() => setSignatureOption("image")}
            />
          </Form.Group>
          {signatureOption === "digital" && (
            <>
              <Form.Group controlId="formSignatureCanvas">
                <Form.Label>Draw Your Signature</Form.Label>
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={200}
                  style={{ border: '1px solid #000', width: '100%' }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                <Button variant="secondary" onClick={clearCanvas} className="mt-2">
                  Clear
                </Button>
                <Button variant="primary" onClick={saveCanvas} className="mt-2">
                  Save
                </Button>
              </Form.Group>
            </>
          )}
          {signatureOption === "image" && (
            <Form.Group controlId="formSignatureImage">
              <Form.Label>Upload Signature Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && <img src={imagePreview} alt="Signature Preview" style={{ marginTop: '10px', maxWidth: '100%' ,maxHeight:'100%' }} />}
            </Form.Group>
          )}
          {signatureOption === "digital" && <Form.Text className="text-muted">Use the canvas to draw your signature.</Form.Text>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addSignature}>
          Add Signature
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignatureModal;
