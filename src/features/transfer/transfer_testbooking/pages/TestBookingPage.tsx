import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import AreaDropdownInput from "../../../core/area/component/AreaDropdownInput";
import TransferExtraMultiSelectInput from "../../transfer_extra/component/TransferExtraMultiSelectInput";

import { TestBookingResponseDTO } from "../types/TestBookingResponseDTO";
import TestBookingQueries from "../controllers/TestBookingQueries";
import { TestBookingRequestDTO } from "../types/TestBookingRequest"
import Area from "../../../core/area/types/Area"
import { TransferExtra } from "../../transfer_extra/types/TransferExtra "
import CityImagePlaceholder from "../../../../assets/placeholders/country_image.webp"

const TestBookingPage: React.FC = () => {
  const [startAreaId, setStartAreaId] = useState<Area | null>(null);
  const [endAreaId, setEndAreaId] = useState<Area | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [childAges, setChildAges] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [extras, setExtras] = useState<TransferExtra[]>([]);
  const [response, setResponse] = useState<TestBookingResponseDTO | null>(null);

  const { mutate: testBooking, isPending } = TestBookingQueries.useTestBooking((data) => {
    setResponse(data);
  });

  const handleSubmit = () => {
    if (!startAreaId || !endAreaId || !startDate || adults < 1) return;

    console.log(startAreaId);
    console.log(endAreaId);
    console.log(startDate);
    console.log(adults);
    const extrasMap: Record<number, number> = {};
    extras.forEach(extra => {
      extrasMap[1] = extra.id; // by default: 1 item of each selected
    });

    const dto: TestBookingRequestDTO = {
      startAreaId: startAreaId.id,
      endAreaId: endAreaId.id,
      adults,
      child: childAges,
      startDate,
      extras: extrasMap,
    };

    testBooking(dto);
  };

  return (
    <Container fluid>
      <h2>Transfer Test Booking</h2>

      {/* Booking Form */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Start Area</Form.Label>
                <AreaDropdownInput value={startAreaId} onChange={setStartAreaId} />
              </Col>
              <Col md={6}>
                <Form.Label>End Area</Form.Label>
                <AreaDropdownInput value={endAreaId} onChange={setEndAreaId} />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Label>Adults</Form.Label>
                <Form.Control
                  type="number"
                  value={adults}
                  min={1}
                  onChange={(e) => setAdults(Number(e.target.value))}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Children</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. 4, 6"
                  onChange={(e) =>
                    setChildAges(
                      e.target.value
                        .split(",")
                        .map((v) => parseInt(v.trim()))
                        .filter((v) => !isNaN(v))
                    )
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Label>Extras</Form.Label>
                <TransferExtraMultiSelectInput value={extras} onChange={setExtras} />
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Booking..." : "Submit Test Booking"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Response Section */}
      {response && (
        <div className="mt-4">
          <h4>Booking Options</h4>
          <Row xs={1} md={2} lg={3} className="g-3">
            {response.transferPrices.map((tp, index) => (
              <Col key={index}>
                <Card className="h-100 shadow-sm">
                  {tp.vehicle?.imageId && (
                    <Card.Img
                      variant="top"
                      src={tp.vehicle.imageId ? `/api/images/${tp.vehicle.imageId}` : CityImagePlaceholder}
                      alt={tp.vehicle.name}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{tp.vehicle?.name || "Vehicle"}</Card.Title>
                    <Card.Text>
                      <strong>Price:</strong> €{tp.totalRates?.toFixed(2)} <br />
                      <strong>Passengers:</strong> {tp.vehicle?.minPax} – {tp.vehicle?.maxPax} <br />
                      <strong>Type:</strong> {tp.vehicle.name || "Standard"} <br />

                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default TestBookingPage;
