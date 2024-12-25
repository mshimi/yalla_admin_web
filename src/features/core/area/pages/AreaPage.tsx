import { Button, Container, Form, Spinner, Stack, Table } from "react-bootstrap"
import PaginationComponent from "../../../../common/components/pagination_componenet/PaginationComponenet"
import FormModal from "../../../../common/modals/FormModal"
import Area from "../types/Area"
import AreaQueries from "../controllers/AreaQueries"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import areaSlice from "../states/areaSlice"
import CreateAreaForm from "../component/CreateAreaForm"
import EditModal from "../../../../common/modals/EditModal"
import EditAreaModal from "../component/EditAreaModal"
import { ClockLoader, PuffLoader } from "react-spinners"

const AreaPage: React.FC = () => {
  const { selectCurrentPage, selectAddAreaModalVisible } = areaSlice.selectors
  const { changePageNumber, showAddAreaModal,setEditArea  } = areaSlice.actions

  const [isProcessLoading, setProcess] = useState(false)

  const dispatch = useAppDispatch()
  const pageNumber = useAppSelector(selectCurrentPage)
  const isAddAreaModalVisible = useAppSelector(selectAddAreaModalVisible)

  // Single search filter state
  const [searchFilter, setSearchFilter] = useState("")
  const areaQueries = AreaQueries

  const createNewArea = areaQueries.useCreate({
    onMutate: () => {
      setProcess(true)
    },
    onSuccess(data) {
      dispatch(showAddAreaModal(false))
      setProcess(false)
    },
  })

  // Fetch areas with pagination and filtering
  const { isError, error, isLoading, isFetched, data } =
    areaQueries.useFindAllPaginated({
      pageNumber: pageNumber,
      pageSize: 30,
      filters: searchFilter
        ? {
            areaName: searchFilter,
            "city.cityName": searchFilter,

            logic: "OR",
          }
        : undefined,
    })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value)
  }

  const useDeleteArea = areaQueries.useDelete({ onMutate: () => {} })

  const useEditArea = areaQueries.useUpdate({ onMutate: () => {} })

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "calc(100vh - 68px)" }}
    >
      {/* Header */}
      <Stack direction="horizontal" className="p-1" gap={3}>
        <h2>Areas</h2>
        <Form className="ms-auto d-flex">
          <Form.Control
            type="text"
            placeholder="Search by Name or City"
            value={searchFilter}
            onChange={handleSearchChange}
            className="me-2"
          />
        </Form>
        <div className="p-1">
          <Button
            variant="primary"
            onClick={() => dispatch(showAddAreaModal(true))}
          >
            Add Area
          </Button>
        </div>
      </Stack>

      {/* Content */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center flex-grow-1">
            <PuffLoader color={"#007bff"} loading={isLoading} size={70} />
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
                    <th>Area Name</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.content.map((area: Area, index: number) => (
                    <tr key={area.id}>
                      <td>{index + 1 + pageNumber * 20}</td>
                      <td>{area.areaName}</td>
                      <td>{area.city.cityName}</td>
                      <td>{area.city.country.countryName}</td>
                      <td>
                        <Stack direction="horizontal" gap={2}>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              dispatch(setEditArea(area));
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                              useDeleteArea.mutate(area.id)
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
                onPageChange={pageNumber => {
                  dispatch(changePageNumber(pageNumber))
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <FormModal
        title="Add Area"
        show={isAddAreaModalVisible}
        onHide={() => {
          dispatch(showAddAreaModal(false))
        }}
      >
        <CreateAreaForm
          onSubmit={function (area: Partial<Area>): void {
            createNewArea.mutate(area)
          }}
          isLoading={isProcessLoading}
        />
      </FormModal>

      <EditAreaModal
      />
    </div>
  )
}

export default AreaPage
