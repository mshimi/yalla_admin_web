import React, { useState } from "react";
import { Form, Button, Stack, Row, Col, Dropdown } from "react-bootstrap";
import WeekdaysDropdown from "../../../../common/components/WeekdaysDropdown";



const AddExcursionsRateForm: React.FC = () => {
  const [isOffer, setIsOffer] = useState(false);
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
    console.log("Selected Weekdays:", selectedWeekdays);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>From Date</Form.Label>
            <Form.Control type="date" required  />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Till Date</Form.Label>
            <Form.Control type="date" required />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter price" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Weekdays</Form.Label>
        <WeekdaysDropdown value={selectedWeekdays} onChange={setSelectedWeekdays} />
      </Form.Group>

      <Form.Check
        type="checkbox"
        label="Is Offer"
        className="mb-3"
        onChange={() => setIsOffer(!isOffer)}
      />

      {isOffer && (
        <>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Booking Window From</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Booking Window Till</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
            <Form.Group className="mb-3">
        <Form.Label>Release (Days)</Form.Label>
        <Form.Control type="number" placeholder="Enter release days" required />
      </Form.Group>
            </Col>
          
          </Row>
        </>
      )}

 

<Stack direction="horizontal" gap={2}   >
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </Stack>
    </Form>
  );
};

export default AddExcursionsRateForm;