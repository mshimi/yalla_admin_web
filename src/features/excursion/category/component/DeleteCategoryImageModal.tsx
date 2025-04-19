import React from "react";
import { Modal, Button } from "react-bootstrap";

type DeleteImageModalProps = {
  show: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
};

const DeleteImageModal: React.FC<DeleteImageModalProps> = ({
                                                             show,
                                                             onClose,
                                                             onConfirmDelete,
                                                           }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this image? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirmDelete}>
          Delete Image
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteImageModal;
