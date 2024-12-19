import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import FormModal from "../../../../common/modals/FormModal";
import { CityQueries } from "../controllers/CityQueries";
import citySlice from "../states/CitySlice";
import { Button, Col, Container, Form, Row, Spinner, Stack } from "react-bootstrap";
import PaginationComponent from "../../../../common/components/pagination_componenet/PaginationComponenet";
import CityCard from "../component/CityCard";
import CreateCityForm from "../component/CreateCityForm";

const CityPage: React.FC = () => {
    const { selectCurrentPage, selectAddCityModalVisible } = citySlice.selectors;
    const { changePageNumber, showAddCityModal } = citySlice.actions;
    
  
    const dispatch = useAppDispatch();
    const pageNumber = useAppSelector(selectCurrentPage);
    const isAddCityModalVisible = useAppSelector(selectAddCityModalVisible);
  
    // Single search filter state
    const [searchFilter, setSearchFilter] = useState("");
  
    const cityQueries = CityQueries();
  
    // Fetch cities with pagination and filtering
    const { isLoading, isError, error, data } = cityQueries.useCityQueries({
      pageNumber,
      filters: searchFilter ? { "cityName": searchFilter, "cityCode": searchFilter, logic:"OR", "country.countryName":searchFilter,"country.countryCode":searchFilter } : {},
    });
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchFilter(e.target.value);
    };
  
 
  
    return (
      <div className="d-flex flex-column" style={{ height: "calc(100vh - 68px)" }}>
        {/* Header */}
        <Stack direction="horizontal" className="p-1" gap={3}>
          <h2>Cities</h2>
          <Form className="ms-auto d-flex" >
            <Form.Control
              type="text"
              placeholder="Search by Name or Code"
              value={searchFilter}
              onChange={handleSearchChange}
              className="me-2"
            />
           
          </Form>
          <div className="p-1">
            <Button variant="primary" onClick={() => dispatch(showAddCityModal(true))}>
              Add City
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
                <Row className="g-3">
                  {data.content.map((city) => (
                    <Col xs={12} sm={12} md={6} lg={4} xl={3} key={city.id}>
                      <CityCard city={city} />
                    </Col>
                  ))}
                </Row>
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
          title="Add City"
          show={isAddCityModalVisible}
          onHide={() => {
            dispatch(showAddCityModal(false));
          }}
        >
          <CreateCityForm />
        </FormModal>
      </div>
    );
  };
  
  export default CityPage;