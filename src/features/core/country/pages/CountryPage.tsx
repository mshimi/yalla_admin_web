import { useState } from "react";
import { CountryQueries } from "../controllers/CountryQueries";
import { Button, Col, Container, Form, Pagination, Row, Spinner, Stack } from "react-bootstrap";
import CountryCard from "../component/CountryCard";
import PaginationComponent from "../../../../common/components/pagination_componenet/PaginationComponenet";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import countrySlice, { showAddCountryModal, showEditCountryModal } from "../states/CountrySlice";
import FormModal from "../../../../common/modals/FormModal";
import CreateCountryForm from "../component/CreateCountryForm";

const CountryPage: React.FC = () => {

   const {selectCurrentPage,selectCreateCountryModalVisible, selectCurrentSelectedCountry,selectEditCountryModalVisible } = countrySlice.selectors;
   const {changePageNumber} = countrySlice.actions;
   const dispatch = useAppDispatch();
   const isCreateCountryModalVisible = useAppSelector(selectCreateCountryModalVisible);
    const pageNumber = useAppSelector(selectCurrentPage);
    const [searchFilter, setSearchFilter] = useState("");



  const countryQueries =  CountryQueries();

 const {isLoading,isError,error,data, isFetched} = countryQueries.useCountryQueries({pageNumber:pageNumber, filters:{countryName:searchFilter, countryCode:searchFilter, logic:"OR"}});


 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchFilter(e.target.value);
  if(e.target.value !== "") {
    dispatch(changePageNumber(0));
  }

};

const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 
};

 return (
  <div className="d-flex flex-column" style={{height:"calc(100vh - 68px)"}}>
    {/* Header */}
    <Stack direction="horizontal" className="p-1 " gap={3}>
      <h2>Countries</h2>
      <Form className="ms-auto d-flex" onSubmit={handleSearchSubmit}>
          <Form.Control
            type="text"
            placeholder="Search by Name or Code"
            value={searchFilter}
            onChange={handleSearchChange}
            className="me-2"
          />
        </Form>
      <div className="p-1 ms-auto">
        <Button variant="primary" onClick={() => dispatch(showAddCountryModal(true))}>
          Add Country
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
              {data.content.map((country) => (
                <Col xs={12} sm={12} md={6} lg={4} xl={3} key={country.id}>
                  <CountryCard country={country} />
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
      title="Add Country"
      show={isCreateCountryModalVisible}
      onHide={() => {
        dispatch(showAddCountryModal(false));
      }}
    >
      <CreateCountryForm />

    </FormModal>

  </div>
);
}


  


export default CountryPage;