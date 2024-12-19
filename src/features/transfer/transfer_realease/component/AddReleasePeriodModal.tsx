import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface AddReleasePeriodModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (period: { startDate: string; endDate: string; days: number }) => void;
}

const AddReleasePeriodModal: React.FC<AddReleasePeriodModalProps> = ({
  show,
  onHide,
  onSave,
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(1);

  const handleSave = () => {
    onSave({ startDate, endDate, days });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Release Period</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Number of Days</Form.Label>
            <Form.Control
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              min="1"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReleasePeriodModal;