
import React, { useState } from "react";
import { Button, Container, Table, Modal, Form, Stack } from "react-bootstrap";
import TransferRate from "../types/TransferRate";
import AreaDropdownInput from "../../../core/area/component/AreaDropdownInput";
import Area from "../../../core/area/types/Area";
import FormModal from "../../../../common/modals/FormModal";
import TransferRateTableHeader from "../component/TransferRateTableHeader"
import TransferRateTableBody from "../component/TransferRateTableBody"
import TransferRateQueries from "../controllers/TransferRateQueries"
import { selectCurrentPage, selectFilters } from "../states/transferRateSlice"
import { useAppSelector } from "../../../../app/hooks"
import TransferRateTable from "../component/TransferRateTable"
import Pagination from "react-bootstrap/Pagination"
import PaginationComponenet from "../../../../common/components/pagination_componenet/PaginationComponenet"

const TransferRatePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [transferRates, setTransferRates] = useState<TransferRate[]>([]);


  const [destinationArea, setDestinationArea] = useState<Area|null>(null);
  const [SourceArea, setSourceArea] = useState<Area|null>(null);




//   const handleSave = () => {
//     if (newTransferRate.destinationArea && newTransferRate.sourceArea) {
//       setTransferRates([
//         ...transferRates,
//         {
//           id: transferRates.length + 1,
//           destinationArea: newTransferRate.destinationArea,
//           sourceArea: newTransferRate.sourceArea,
//           ratePerPerson: newTransferRate.ratePerPerson || 0,
//           createdAt: new Date(),
//           isActive: true,
//         } as TransferRate,
//       ]);
//       setShowModal(false);
//       setNewTransferRate({ destinationArea: null, sourceArea: null, ratePerPerson: 0 });
//     }
//   };

  return (
    <Container fluid>
      <div className="d-flex flex-column" style={{ height: "calc(100vh - 68px)" }}>
        <div className="d-flex align-items-center justify-content-between my-4">
          <h2>Transfer Rate Management</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Rate
          </Button>
        </div>


          <TransferRateTable />

          <div className="d-flex justify-content-center py-1">
            <PaginationComponenet pageInfo={{ size: 50, totalPages: 3, number: 1, totalElements: 50 }}
                                  onPageChange={(page) => {
                                  }} />
          </div>

          <FormModal
            show={showModal}
            title={"Add Transfer Rate"}
            onHide={() => {
              setShowModal(false)
            }}
          >
            <>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Destination Area</Form.Label>
                  <AreaDropdownInput
                    value={destinationArea}
                    onChange={area => {
                      if (area !== null) {
                        setDestinationArea(area)
                      } else {
                        setDestinationArea(null)
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Source Area</Form.Label>
                  <AreaDropdownInput
                    value={SourceArea}
                    onChange={area => {
                      if (area !== null) {
                        setSourceArea(area)
                      } else {
                        setSourceArea(null)
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rate Per Person</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    onChange={e => {
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Release (Days)</Form.Label>
                  <Form.Control type="number" min={0} onChange={e => {
                  }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Reverse Rate"
                    onChange={e => {
                    }}
                  />
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
            </>
          </FormModal>


        </div>
    </Container>
)
};

export default TransferRatePage;