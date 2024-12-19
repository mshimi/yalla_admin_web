import { useState } from "react";
import FormModal from "../../../../common/modals/FormModal";
import airportSlice from "../states/airportSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import AirportQueries from "../controllers/AirportQueries";
import { Button, Container, Form, Spinner, Stack, Table } from "react-bootstrap";
import Airport from "../types/Airport";
import PaginationComponent from "../../../../common/components/pagination_componenet/PaginationComponenet";
import CreateAirportForm from "../component/CreateAirportForm";
import EditAirportModal from "../component/EditAirportModal";

const AirportPage: React.FC = () => {
    const { selectCurrentPage, selectAddAirportModalVisible } = airportSlice.selectors;
    const { changePageNumber, showAddAirportModal, setEditAirport } = airportSlice.actions;
  
    const [isProcessLoading, setProcess] = useState(false);
  
    const dispatch = useAppDispatch();
    const pageNumber = useAppSelector(selectCurrentPage);
    const isAddAirportModalVisible = useAppSelector(selectAddAirportModalVisible);
  
    // Single search filter state
    const [searchFilter, setSearchFilter] = useState("");
    const airportQueries = AirportQueries;
  
    const createNewAirport = airportQueries.useCreate({
      onMutate: () => {
        setProcess(true);
      },
      onSuccess(data) {
        dispatch(showAddAirportModal(false));
        setProcess(false);
      },
    });
  
    // Fetch airports with pagination and filtering
    const { isError, error, isLoading, data } = airportQueries.useFindAllPaginated({
      pageNumber: pageNumber,
      pageSize: 30,
      filters: searchFilter
        ? {
            airportName: searchFilter,
            "area.areaName": searchFilter,
            "area.city.cityName": searchFilter,
            logic: "OR",
          }
        : undefined,
    });
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchFilter(e.target.value);
    };
  
    const useDeleteAirport = airportQueries.useDelete({ onMutate: () => {} });
  
    return (
      <div className="d-flex flex-column" style={{ height: "calc(100vh - 68px)" }}>
        {/* Header */}
        <Stack direction="horizontal" className="p-1" gap={3}>
          <h2>Airports</h2>
          <Form className="ms-auto d-flex">
            <Form.Control
              type="text"
              placeholder="Search by Name, Area, or City"
              value={searchFilter}
              onChange={handleSearchChange}
              className="me-2"
            />
          </Form>
          <div className="p-1">
            <Button variant="primary" onClick={() => dispatch(showAddAirportModal(true))}>
              Add Airport
            </Button>
          </div>
        </Stack>
  
        {/* Content */}
        <div className="d-flex flex-column flex-grow-1 overflow-hidden">
          {isLoading && (
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
              <Spinner animation="border" />
            </div>
          )}
          {isError && (
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
              <p>{error.message}</p>
            </div>
          )}
          {data && (
            <div className="d-flex flex-column flex-grow-1 overflow-hidden">
              <Container fluid className="flex-grow-1 overflow-auto">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Airport Name</th>
                      <th>Airport Code</th>
                      <th>Area</th>
                      <th>City</th>
                      <th>Country</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.content.map((airport: Airport, index: number) => (
                      <tr key={airport.id}>
                        <td>{index + 1 + pageNumber * 20}</td>
                        <td>{airport.airportName}</td>
                        <td>{airport.airportCode}</td>
                        <td>{airport.area.areaName}</td>
                        <td>{airport.area.city.cityName}</td>
                        <td>{airport.area.city.country.countryName}</td>
                        <td>
                          <Stack direction="horizontal" gap={2}>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                dispatch(setEditAirport(airport));
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => {
                                useDeleteAirport.mutate(airport.id);
                              }}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
  
              {/* Pagination */}
              <div className="d-flex justify-content-center py-1">
                <PaginationComponent
                  pageInfo={data.page}
                  currentPage={pageNumber}
                  onPageChange={(pageNumber) => {
                    dispatch(changePageNumber(pageNumber));
                  }}
                />
              </div>
            </div>
          )}
        </div>
  
        {/* Modal */}
        <FormModal
          title="Add Airport"
          show={isAddAirportModalVisible}
          onHide={() => {
            dispatch(showAddAirportModal(false));
          }}
        >
          <CreateAirportForm
            onSubmit={(airport: Partial<Airport>) => {
              createNewAirport.mutate(airport);
            }}
            isLoading={isProcessLoading}
          />
        </FormModal>
  
        <EditAirportModal />
      </div>
    );
  };
  
  export default AirportPage;