import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

const SignatureModal = ({
  showModal,
  handleClose,
  signatureName,
  handleSignatureNameChange,
  addSignature,
  setSignatureImage,
}) => {
  let sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();
  const save = () => setSignatureImage(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Signature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSignatureName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={signatureName}
              onChange={handleSignatureNameChange}
            />
          </Form.Group>
          <div className="sigCanvas">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            />
            <Button variant="secondary" onClick={clear}>
              Clear
            </Button>
            <Button variant="primary" onClick={save}>
              Save
            </Button>
          </div>
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
