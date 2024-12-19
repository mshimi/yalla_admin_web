import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddReleasePeriodModal from "../component/AddReleasePeriodModal";
import GeneralRelease from "../component/GeneralRelease";
import ReleasePeriodsTable from "../component/ReleasePeriodsTable";

const TransferReleasePage: React.FC = () => {
    const [generalDays, setGeneralDays] = useState(7);
    const [releasePeriods, setReleasePeriods] = useState([
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
      { id: 1, startDate: "2024-01-01", endDate: "2024-01-07", days: 5, isActive: true },
      { id: 2, startDate: "2024-02-01", endDate: "2024-02-14", days: 10, isActive: false },
    ]);
    const [showAddModal, setShowAddModal] = useState(false);
  
    const handleAddPeriod = (newPeriod: { startDate: string; endDate: string; days: number }) => {
      setReleasePeriods([
        ...releasePeriods,
        { id: releasePeriods.length + 1, ...newPeriod, isActive: false },
      ]);
    };
  
    const handleEditPeriod = (updatedPeriod: any) => {
      setReleasePeriods(
        releasePeriods.map((p) => (p.id === updatedPeriod.id ? updatedPeriod : p))
      );
    };
  
    const handleDeletePeriod = (id: number) => {
      setReleasePeriods(releasePeriods.filter((p) => p.id !== id));
    };
  
    return (
      <Container className="my-4">
        <Stack gap={4}>
          <GeneralRelease
            numberOfDays={generalDays}
            onSave={(days) => setGeneralDays(days)}
          />
          <Stack direction="horizontal" className="justify-content-between">
            <h4>Release Periods</h4>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Add New Period
            </Button>
          </Stack>
          <ReleasePeriodsTable
            periods={releasePeriods}
            onEdit={handleEditPeriod}
            onDelete={handleDeletePeriod}
          />
        </Stack>
  
        <AddReleasePeriodModal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          onSave={handleAddPeriod}
        />
      </Container>
    );
}

export default TransferReleasePage;