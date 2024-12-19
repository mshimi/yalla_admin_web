import { Button, Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import VehicleQuieres from "../controllers/VehicleQuieres";
import Vehicle from "../types/Vehicle";
import VehicleCard from "../component/VehicleCard";
import PaginationComponent from "../../../../common/components/pagination_componenet/PaginationComponenet";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { changePageNumber, selectAddVehicleModalVisible, selectCurrentPage, showAddVehicleModal } from "../states/vehicleSlice";
import CreateVehicleForm from "../component/CreateVehicleForm";
import FormModal from "../../../../common/modals/FormModal";

const VehiclePage: React.FC = () => {



    const dispatch = useAppDispatch(); 
    const currentPage = useAppSelector(selectCurrentPage);
  const isAddModalOpen = useAppSelector(selectAddVehicleModalVisible);





  const  vehicleQuieres = VehicleQuieres;

  const {data, isLoading, error} =  vehicleQuieres.useFindAllPaginated({
    pageNumber: currentPage,
    pageSize: 30,
    filters: undefined, 
    });


   



  return (
    <div className="d-flex flex-column" style={{ height: "calc(100vh - 68px)" }}>
        {/* Header */}
        <Stack direction="horizontal" className="p-1" gap={3}>
          <h2>Vehicles</h2>
          <div className="p-1 ms-auto">
        <Button variant="primary" onClick={() => dispatch(showAddVehicleModal(true))}>
          Add Vehicle
        </Button>
      </div>

        </Stack>
  
        {/* Content */}
        <div className="d-flex flex-column flex-grow-1 overflow-hidden p-1">

            {isLoading && (
              <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <Spinner animation="border" />
              </div>
            )}
            {error && (
              <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <p>{error.message}</p>
              </div>
            )}
            {data && (
        <div className="d-flex flex-column flex-grow-1 overflow-hidden">
          <Container fluid className="flex-grow-1 overflow-auto">
            <Row className="g-3">
              {data.content.map((vehicle:Vehicle) => (
                <Col xs={12} sm={12} md={6} lg={4} xl={3} key={vehicle.id}>
                  <VehicleCard vehicle={vehicle} />
                </Col>
              ))}
            </Row>
          </Container>

          {/* Pagination */}
          <div className="d-flex justify-content-center py-1">
            <PaginationComponent
              pageInfo={data.page}
              currentPage={currentPage}
              onPageChange={(pageNumber) => {
                dispatch(changePageNumber(pageNumber));
              }}
            />
          </div>

          <FormModal
      title="Add Vehicle"
      show={isAddModalOpen}
      onHide={() => {
        dispatch(showAddVehicleModal(false));
      }}
    >
        <CreateVehicleForm/>

    </FormModal>


            


        </div>
      )}
            </div>
            </div>
  );
}

export default VehiclePage;