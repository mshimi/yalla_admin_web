import React from "react";
import { Table, Button, Stack } from "react-bootstrap";

interface ReleasePeriod {
  id: number;
  startDate: string;
  endDate: string;
  days: number;
  isActive: boolean;
}

interface ReleasePeriodsTableProps {
  periods: ReleasePeriod[];
  onEdit: (period: ReleasePeriod) => void;
  onDelete: (id: number) => void;
}

const ReleasePeriodsTable: React.FC<ReleasePeriodsTableProps> = ({
  periods,
  onEdit,
  onDelete,
}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Days</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {periods.map((period, index) => (
          <tr key={period.id}>
            <td>{index + 1}</td>
            <td>{period.startDate}</td>
            <td>{period.endDate}</td>
            <td>{period.days}</td>
            <td>
              <span
                className={`badge ${
                  period.isActive ? "bg-success" : "bg-secondary"
                }`}
              >
                {period.isActive ? "Active" : "Inactive"}
              </span>
            </td>
            <td>
              <Stack direction="horizontal" gap={2}>
                <Button size="sm" variant="secondary" onClick={() => onEdit(period)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(period.id)}>
                  Delete
                </Button>
              </Stack>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReleasePeriodsTable;