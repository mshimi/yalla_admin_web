import React from "react"
import { Modal, Button } from "react-bootstrap"

type ConfirmationModalProps = {
  show: boolean
  loading: boolean
  header: string
  message: string
  onCancel: () => void
  onSubmit: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  header,
  message,
  onCancel,
  onSubmit,
  loading = false,
}) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={loading} variant="primary" onClick={onSubmit}>
          {loading ? "Loading" : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
