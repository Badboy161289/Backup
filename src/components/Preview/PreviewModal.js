import React from "react";
import { Modal, Button } from "react-bootstrap";

const PreviewModal = ({ previewType, previewContent, handleDownload, handleClose, handleShowSignature }) => (
  <Modal show={!!previewContent} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Preview {previewType.toUpperCase()}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {previewType === "pdf" && <iframe src={previewContent} width="100%" height="400px" />}
      {previewType === "word" && <iframe src={previewContent} width="100%" height="400px" />}
      {previewType === "rtf" && <iframe src={previewContent} width="100%" height="400px" />}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      {/* <Button variant="primary" onClick={handleShowSignature}>
        Add Signature
      </Button> */}
      <Button variant="success" onClick={handleDownload}>
        Download
      </Button>
    </Modal.Footer>
  </Modal>
);

export default PreviewModal;
