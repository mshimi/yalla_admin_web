import React from "react"
import { Container, Form, InputGroup, Table, Button, Pagination } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import ExcursionItemQueries from "../controllers/ExcursionItemQueries"
import { ExcursionItemAdmin } from "../types/ExcursionItemAdmin"

const ExcursionItemPage: React.FC = () => {
  const [page, setPage] = React.useState(0)
  const [size] = React.useState(10)
  const [search, setSearch] = React.useState("")
  const [searchInput, setSearchInput] = React.useState("")

  const { data, isPending, error } = ExcursionItemQueries.useGetItemsForAdminPaginated({
    page,
    size,
    key: search.trim() || undefined,
  })

  const handleSearch = () => {
    setPage(0)
    setSearch(searchInput)
  }

  return (
    <Container fluid className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Excursion Items</h3>
        <InputGroup style={{ maxWidth: 300 }}>
          <Form.Control
            placeholder="Search by English name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={handleSearch}>
            <FaSearch />
          </Button>
        </InputGroup>
      </div>

      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {data && (
        <>
          <Table bordered hover responsive>
            <thead>
            <tr>
              <th>ID</th>
              <th>English Name</th>
              <th>Missing Languages</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.content.map((adminItem: ExcursionItemAdmin) => {
              const en = adminItem.item.translations.find(t => t.lang === "EN")
              return (
                <tr key={adminItem.item.id}>
                  <td>{adminItem.item.id}</td>
                  <td>{en?.name || <i>No EN name</i>}</td>
                  <td>
                    {adminItem.missingLanguages.length > 0
                      ? adminItem.missingLanguages.join(", ")
                      : "Complete"}
                  </td>
                  <td>
                    {/* Hier kommen später Buttons für Edit, Translate, Delete */}
                    <Button size="sm" variant="primary">Edit</Button>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </Table>

          {/* Pagination */}
          <Pagination>
            {Array.from({ length: data.totalPages }).map((_, i) => (
              <Pagination.Item key={i} active={i === data.number} onClick={() => setPage(i)}>
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}
    </Container>
  )
}

export default ExcursionItemPage
