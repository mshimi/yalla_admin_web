import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import ReleaseService from "../service/ReleaseService"
import ReleaseQueries from "../controllers/ReleaseQueries"

interface BackToGeneralModalProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
}

const BackToGeneralModal: React.FC<BackToGeneralModalProps> = ({ show, onHide, onSuccess }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const backToGeneralRelease = ReleaseQueries.useBacktoGeneralRelease();

  const handleSubmit = () => {
    setError(null);

    // Validation
    if (!startDate || !endDate) {
      setError("Both start and end dates are required.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date must be before or equal to end date.");
      return;
    }

    // Call the mutation
    backToGeneralRelease.mutateAsync({ startDate, endDate }, {
      onSuccess: () => {
        onHide();
        onSuccess();
      },
      onError: (error) => {
        if(error instanceof Error){
          setError(error.message);
        }
        else {
          setError("An unknown error occurred.");
        }
      }
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Back to General Release</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={backToGeneralRelease.isPending}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={backToGeneralRelease.isPending}>
          {backToGeneralRelease.isPending ? "Processing..." : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BackToGeneralModal;