import React, { useState } from "react";
import { Form, Button, Stack, Row, Col } from "react-bootstrap";
import WeekdaysDropdown from "../../../../common/components/WeekdaysDropdown";

const AddStopSaleForm: React.FC = () => {

  const [StopSaleType, setStopSaleType] = useState<"Offers Only"|"All">("All");


  const handleOnChangeStopsaleType = (type: "Offers Only"|"All") => {
    setStopSaleType(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
    

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>From Date</Form.Label>
            <Form.Control type="date" required />
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
    <Form.Label>Weekdays</Form.Label>
    <WeekdaysDropdown value={selectedWeekdays} onChange={setSelectedWeekdays} />
  </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="All" onChange={(e)=> {handleOnChangeStopsaleType("All")}} checked={StopSaleType === "All"} />
        <Form.Check type="checkbox" label="Offer Only" onChange={(e)=> {handleOnChangeStopsaleType("Offers Only")}} checked={StopSaleType === "Offers Only"}/>
      </Form.Group>

      <Stack direction="horizontal" gap={2}>
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

export default AddStopSaleForm;