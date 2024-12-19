
import React, { useState } from "react";
import { Button, Container, Table, Modal, Form, Stack } from "react-bootstrap";
import TransferRate from "../types/TransferRate";
import AreaDropdownInput from "../../../core/area/component/AreaDropdownInput";
import Area from "../../../core/area/types/Area";
import FormModal from "../../../../common/modals/FormModal";

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
    <Container>
      <div className="d-flex align-items-center justify-content-between my-4">
        <h2>Transfer Rate Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Rate
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Destination Area</th>
            <th>Source Area</th>
            <th>Rate Per Person</th>
            <th>Created At</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {transferRates.map((rate, index) => (
            <tr key={rate.id}>
              <td>{index + 1}</td>
              <td>{rate.destinationArea.areaName}</td>
              <td>{rate.sourceArea.areaName}</td>
              <td>{rate.ratePerPerson.toFixed(2)}</td>
              <td>{rate.createdAt.toLocaleDateString()}</td>
              <td>{rate.isActive ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <FormModal show={showModal} title={"Add Transfer Rate"} onHide={()=> {setShowModal(false)}}>
            <>
            <Form>
            <Form.Group className="mb-3">
              <Form.Label>Destination Area</Form.Label>
              <AreaDropdownInput
                value={destinationArea}
                onChange={(area) => {
                  if(area!==null){
                    setDestinationArea(area)
                  }
                  else {
                    setDestinationArea(null)
                  }
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Source Area</Form.Label>
              <AreaDropdownInput
                value={ SourceArea}
                onChange={(area) => {
                  if(area!==null){
                    setSourceArea(area)
                  }
                  else {
                    setSourceArea(null)
                  }
                }
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rate Per Person</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                
                onChange={(e) => {}
            }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3"  >
              <Form.Label>Release (Days)</Form.Label>
              <Form.Control
             
                type="number"
                min={0}
           
                onChange={(e) => {}
            }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Reverse Rate"
                onChange={(e) => {}
            }
              />
            </Form.Group>
           <Stack direction="horizontal" gap={2}   >
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

      {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transfer Rate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        </Modal.Body>
        <Modal.Footer>
       
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
};

export default TransferRatePage;