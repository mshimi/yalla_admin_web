import React from "react"
import { Container, Form, InputGroup, Table, Button, Pagination, Stack } from "react-bootstrap"
import { FaPlus, FaSearch } from "react-icons/fa"
import ExcursionItemQueries from "../controllers/ExcursionItemQueries"
import { ExcursionItemAdmin } from "../types/ExcursionItemAdmin"
import FormModal from "../../../../common/modals/FormModal"
import CreateExcursionItemForm from "../component/CreateExcursionItemForm"
import ExcursionItemTableRow from "../component/ExcursionItemTableRow"

const ExcursionItemPage: React.FC = () => {
  const [page, setPage] = React.useState(0)
  const [size, setSize] = React.useState(10)
  const [search, setSearch] = React.useState("")
  const [searchInput, setSearchInput] = React.useState("")
  const [createOpen, setCreateOpen] = React.useState(false)

  const { data, isPending, error } = ExcursionItemQueries.useGetItemsForAdminPaginated({
    page,
    size,
    key: search.trim() || undefined,
  })

  const handleSearch = () => {
    setPage(0)
    setSearch(searchInput)
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value))
    setPage(0)
  }

  return (
    <Container fluid className="d-flex flex-column vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mt-3 mb-2 px-2">
        <Stack direction="horizontal" style={{ width: "100%" }}>
          <h3 className="m-0">Excursion Items</h3>
          <Stack direction="horizontal" className="ms-auto ">
            <InputGroup>
              <Form.Control
                placeholder="Search by English name..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={handleSearch}>
                <FaSearch />
              </Button>
            </InputGroup>
            <Button
              variant="success"
              size="sm"
              className="ms-2 d-flex align-items-center"
              style={{ whiteSpace: "nowrap", gap: "6px" }}
              onClick={() => setCreateOpen(true)}
            >
              <FaPlus />
              Add Item
            </Button>
          </Stack>
        </Stack>
      </div>

      {/* Content */}
      <div className="flex-grow-1 overflow-auto px-2">
        {isPending && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}

        {data && (
          <Table bordered hover responsive className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>English Name</th>
                <th>Missing Languages</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.content.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No excursion items found.
                  </td>
                </tr>
              ) : (
                data.content.map(adminItem => {
                  return <ExcursionItemTableRow adminItem={adminItem} />
                })
              )}
            </tbody>
          </Table>
        )}
      </div>

      {/* Footer */}
      <div className="d-flex  align-items-center py-2 px-3 border-top bg-light sticky-bottom">
        <div className="d-flex align-items-center gap-2">
          <span className="mb-0">Items per page:</span>
          <Form.Select
            value={size}
            onChange={handleSizeChange}
            style={{ width: "100px" }}
          >
            {[5, 10, 20, 50].map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Form.Select>
        </div>
        {data && data.page.totalPages > 0 && (
          <Pagination className="mb-0 ms-5">
            {Array.from({ length: data.page.totalPages }).map((_, i) => (
              <Pagination.Item
                key={i}
                active={i === data.page.number}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </div>

      {/* Modal */}
      <FormModal
        title="Add Excursion Item"
        show={createOpen}
        onHide={() => setCreateOpen(false)}
      >
        <CreateExcursionItemForm closeDialog={() => setCreateOpen(false)} />
      </FormModal>
    </Container>
  )
}

export default ExcursionItemPage
