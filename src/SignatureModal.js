import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SignatureModal = ({ showModal, handleClose, signatureName, handleSignatureNameChange, addSignature }) => (
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
            placeholder="Enter your name"
            value={signatureName}
            onChange={handleSignatureNameChange}
          />
        </Form.Group>
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

export default SignatureModal;
