import { useState } from "react";
import City from "../../city/types/City";
import { Button, Form, Stack } from "react-bootstrap";
import CityDropdownInput from "../../city/component/CityDropdownInput";
import Hotel from "../types/Hotel";
import Area from "../../area/types/Area";
import AreaDropdownInput from "../../area/component/AreaDropdownInput";

interface CreateHotelFormProps {
    onSubmit: (area: Partial<Hotel>) => void;
    isLoading?: boolean;
  }
  
  const CreateHotelForm: React.FC<CreateHotelFormProps> = ({ onSubmit, isLoading }) => {
    const [hotelName, setHotelName] = useState("");
    const [area, setArea] = useState<Area | null>(null);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (hotelName && area) {
        onSubmit({ hotelName, area });
      }
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Hotel Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Hotel name"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            required
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <AreaDropdownInput
            value={area}
            onChange={(selectedArea) => setArea(selectedArea)}
          />
        </Form.Group>
  
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button variant="secondary" type="button" onClick={() => { setHotelName(""); setArea(null); }}>
            Reset
          </Button>
        </Stack>
      </Form>
    );
  };
  
  export default CreateHotelForm;