import React from "react"
import { Modal, Button, Spinner } from "react-bootstrap"

interface ConfirmationModalProps {
  show: boolean
  onHide: () => void
  onConfirm: () => void
  status: boolean
  transferRateId: number | null,
  isLoading: boolean
}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                               show,
                                                               onHide,
                                                               onConfirm,
  status,                                                       isLoading,
                                                               transferRateId,

                                                             }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!status ? (
          <p>
            Are you sure you want to deactivate the Transfer Rate with ID{" "}
            <strong>{transferRateId}</strong>?
          </p>
        ) : (
          <p>
            Are you sure you want to reactivate the Transfer Rate with ID{" "}
            <strong>{transferRateId}</strong>? Activating this rate will
            deactivate any active Transfer Rate for the same areas.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant="primary" onClick={onConfirm}>
          {
            isLoading ? <Spinner/> : status ? "Reactivate" : "Deactivate"
          }
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
