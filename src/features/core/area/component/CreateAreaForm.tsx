import { useState } from "react";
import City from "../../city/types/City";
import Area from "../types/Area";
import { Button, Form, Stack } from "react-bootstrap";
import CityDropdownInput from "../../city/component/CityDropdownInput";

interface CreateAreaFormProps {
    onSubmit: (area: Partial<Area>) => void;
    isLoading?: boolean;
  }
  
  const CreateAreaForm: React.FC<CreateAreaFormProps> = ({ onSubmit, isLoading }) => {
    const [areaName, setAreaName] = useState("");
    const [city, setCity] = useState<City | null>(null);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (areaName && city) {
        onSubmit({ areaName, city });
      }
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Area Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter area name"
            value={areaName}
            onChange={(e) => setAreaName(e.target.value)}
            required
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <CityDropdownInput
            value={city}
            onChange={(selectedCity) => setCity(selectedCity)}
          />
        </Form.Group>
  
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button variant="secondary" type="button" onClick={() => { setAreaName(""); setCity(null); }}>
            Reset
          </Button>
        </Stack>
      </Form>
    );
  };
  
  export default CreateAreaForm;