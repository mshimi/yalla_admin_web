import React from "react";
import { Card, Button } from "react-bootstrap";
import TransferChildrenPolicyQueries from "../controllers/TransferChildrenPolicyQueries";
import { TransferChildrenPolicy } from "../types/TransferChildrenPolicy"

const ActivePolicyCard: React.FC<TransferChildrenPolicy> = (activePolicy: TransferChildrenPolicy) => {

  const { mutate: deactivatePolicy } = TransferChildrenPolicyQueries.useSetPolicyAsInactive();
  return (
    <Card>
      <Card.Body>
        <Card.Title>Current Active Policy</Card.Title>




          <>

            <Card.Text>
              <b>Policy ID:</b> {activePolicy.id}
            </Card.Text>
            <Card.Text>
              <b>Status:</b> Active
            </Card.Text>

            <Button
              variant="danger"
              onClick={() => deactivatePolicy(activePolicy.id)}
            >
              Deactivate Policy
            </Button>
          </>

      </Card.Body>
    </Card>
  );
};

export default ActivePolicyCard;