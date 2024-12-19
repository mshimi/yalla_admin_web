import React, { useState } from "react";
import { Button, Form, Spinner, Stack } from "react-bootstrap";
import AreaDropdownInput from "../../area/component/AreaDropdownInput";
import Airport from "../types/Airport";
import Area from "../../area/types/Area";
interface CreateAirportFormProps {
    onSubmit: (airport: Partial<Airport>) => void;
    isLoading?: boolean;
  }
  
  const CreateAirportForm: React.FC<CreateAirportFormProps> = ({ onSubmit, isLoading }) => {
    const [airportName, setAirportName] = useState("");
    const [airportCode, setAirportCode] = useState("");

    const [area, setArea] = useState<Area | null>(null);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (airportName && area && airportCode) {
        onSubmit({ airportName, airportCode , area });
      }
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Airport Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter airport name"
            value={airportName}
            onChange={(e) => setAirportName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Airport Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter airport code"
            value={airportCode}
            onChange={(e) => setAirportCode(e.target.value)}
            required
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Area</Form.Label>
          <AreaDropdownInput
            value={area}
            onChange={(selectedArea) => setArea(selectedArea)}
          />
        </Form.Group>
  
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              setAirportName("");
              setArea(null);
            }}
          >
            Reset
          </Button>
        </Stack>
      </Form>
    );
  };
  
  export default CreateAirportForm;