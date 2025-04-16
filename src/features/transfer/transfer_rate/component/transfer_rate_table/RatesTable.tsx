import React from "react";
import { Table, Button } from "react-bootstrap";

const RatesTable: React.FC = () => {
  const rates = [
    // Example data, replace with fetched data
    {
      id: 1,
      rateType: "Offer",
      fromDate: "2024-01-01",
      tillDate: "2024-01-10",
      price: 100,
      weekdays: ["Monday", "Tuesday"],
      release: 2,
      bookingWindow: "2023-12-01 to 2023-12-15",
      arrivalWindow: "2024-01-01 to 2024-01-05",
    },
  ];

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Rate Type</th>
          <th>From Date</th>
          <th>Till Date</th>
          <th>Price</th>
          <th>Weekdays</th>
          <th>Release (Days)</th>
          <th>Booking Window</th>
          <th>Arrival Window</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate, index) => (
          <tr key={rate.id}>
            <td>{index + 1}</td>
            <td>{rate.rateType}</td>
            <td>{rate.fromDate}</td>
            <td>{rate.tillDate}</td>
            <td>{rate.price}</td>
            <td>{rate.weekdays.join(", ")}</td>
            <td>{rate.release}</td>
            <td>{rate.bookingWindow || "-"}</td>
            <td>{rate.arrivalWindow || "-"}</td>
            <td>
              <Button variant="secondary" size="sm">
                Edit
              </Button>{" "}
              <Button variant="danger" size="sm">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RatesTable;