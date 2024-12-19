import React, { useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";

interface GeneralReleaseProps {
  numberOfDays: number;
  onSave: (days: number) => void;
}

const GeneralRelease: React.FC<GeneralReleaseProps> = ({ numberOfDays, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [days, setDays] = useState(numberOfDays);

  const handleSave = () => {
    onSave(days);
    setShowModal(false);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>General Release Settings</Card.Title>
        <Card.Text>
          Number of Days for General Release: <strong>{numberOfDays} Days</strong>
        </Card.Text>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Edit General Release
        </Button>
      </Card.Body>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit General Release</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default GeneralRelease;