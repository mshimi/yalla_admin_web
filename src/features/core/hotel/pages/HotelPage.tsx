import { useState } from "react";
import FormModal from "../../../../common/modals/FormModal";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import hotelSlice from "../states/hotelSlice";
import HotelQueries from "../controllers/HotelQueries";
import { Button, Container, Form, Spinner, Stack, Table } from "react-bootstrap";
import Hotel from "../types/Hotel";
import PaginationComponent from "../../../../common/components/pagination_componenet/PaginationComponenet";
import CreateHotelForm from "../component/CreateHotelForm";
import EditHotelModal from "../component/EditHotelModal";

const HotelPage: React.FC = () => {
    const { selectCurrentPage, selectAddHotelModalVisible } = hotelSlice.selectors;
    const { changePageNumber, showAddHotelModal, setEditHotel } = hotelSlice.actions;
  
    const [isProcessLoading, setProcess] = useState(false);
  
    const dispatch = useAppDispatch();
    const pageNumber = useAppSelector(selectCurrentPage);
    const isAddHotelModalVisible = useAppSelector(selectAddHotelModalVisible);
  
    // Single search filter state
    const [searchFilter, setSearchFilter] = useState("");
    const hotelQueries = HotelQueries;
  
    const createNewHotel = hotelQueries.useCreate({
      onMutate: () => {
        setProcess(true);
      },
      onSuccess(data) {
        dispatch(showAddHotelModal(false));
        setProcess(false);
      },
    });
  
    // Fetch hotels with pagination and filtering
    const { isError, error, isLoading, data } = hotelQueries.useFindAllPaginated({
      pageNumber: pageNumber,
      pageSize: 30,
      filters: searchFilter
        ? {
            hotelName: searchFilter,
            "area.areaName": searchFilter,
            "area.city.cityName": searchFilter,
            logic: "OR",
          }
        : undefined,
    });
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchFilter(e.target.value);
    };
  
    const useDeleteHotel = hotelQueries.useDelete({ onMutate: () => {} });
  
    return (
      <div className="d-flex flex-column" style={{ height: "calc(100vh - 68px)" }}>
        {/* Header */}
        <Stack direction="horizontal" className="p-1" gap={3}>
          <h2>Hotels</h2>
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
            <Button variant="primary" onClick={() => dispatch(showAddHotelModal(true))}>
              Add Hotel
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
                      <th>Hotel Name</th>
                      <th>Area</th>
                      <th>City</th>
                      <th>Country</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.content.map((hotel: Hotel, index: number) => (
                      <tr key={hotel.id}>
                        <td>{index + 1 + pageNumber * 20}</td>
                        <td>{hotel.hotelName}</td>
                        <td>{hotel.area.areaName}</td>
                        <td>{hotel.area.city.cityName}</td>
                        <td>{hotel.area.city.country.countryName}</td>
                        <td>
                          <Stack direction="horizontal" gap={2}>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                dispatch(setEditHotel(hotel));
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => {
                                useDeleteHotel.mutate(hotel.id);
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
          title="Add Hotel"
          show={isAddHotelModalVisible}
          onHide={() => {
            dispatch(showAddHotelModal(false));
          }}
        >
          <CreateHotelForm
            onSubmit={(hotel: Partial<Hotel>) => {
              createNewHotel.mutate(hotel);
            }}
            isLoading={isProcessLoading}
          />
        </FormModal>
  
        <EditHotelModal />
      </div>
    );
  };
  
  export default HotelPage;