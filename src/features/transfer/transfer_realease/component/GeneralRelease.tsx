import React, { useState } from "react";
import { Card, Button, Form, Modal, Spinner } from "react-bootstrap"
import { useMutation } from "@tanstack/react-query"
import ReleaseQueries from "../controllers/ReleaseQueries"
import { GeneralTransferRelease } from "../types/GeneralTransferRelease"


const GeneralRelease: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [days, setDays] = useState<number | null>(null);

  // Fetch the general release data
  const { data: generalRelease, isLoading } = ReleaseQueries.useFindGeneralRelease();

  // Mutation for saving the general release
  const mutation = ReleaseQueries.useAddGeneralRelease(  (data)=> {
    setShowModal(false);
  } );


  const handleSave = () => {
    if (days !== null) {
      const generalRelease : Partial< GeneralTransferRelease> = {
        releaseDays:days,
      };

        mutation.mutate(generalRelease);

    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>General Release Settings</Card.Title>
        {isLoading ? (
          <Spinner animation="border" />
        ) : generalRelease ? (

            <Card.Text>
              Number of Days for General Release: <strong>{generalRelease.releaseDays} Days</strong>
            </Card.Text>


        ) : (
          <Card.Text>No general release configured. Please add one.</Card.Text>
        )}
        <Button
          variant="primary"
          onClick={() => {
            setDays(generalRelease ? generalRelease.releaseDays : 0);
            setShowModal(true);
          }}
        >
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
                value={days ?? ""}
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
          <Button variant="primary" onClick={handleSave} disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default GeneralRelease;