import { Alert, Button, Spinner, Stack, Table } from "react-bootstrap"

interface ReleasePeriodsTableProps {
  isLoading: boolean
  periods: TransferRelease[] | undefined
  onDelete: (id: number) => void
  error: string | undefined
}

const ReleasePeriodsTable: React.FC<ReleasePeriodsTableProps> = ({
  periods,
  onDelete,
  isLoading,
  error


}) => {
  return (
    <div style={{ position: "relative" }}>
      {/* Error Handling */}
      {error && (
        <Alert variant="danger">
          <strong>Error:</strong> {"error"}
        </Alert>
      )}

      {/* No Data Handling */}
      {!isLoading && !error && periods && periods.length === 0 && (
        <Alert variant="info">No data available.</Alert>
      )}

      {/* Table */}

      <div style={{ position: "relative" }}>
        {!isLoading && periods && periods.length > 0 && (
        <Table
          striped
          bordered
          hover
          responsive
          className={isLoading ? "table-blur" : ""}
        >
          <thead>
          <tr>
            <th className="text-center" >#</th>
            <th className="text-center" >Start Date</th>
            <th className="text-center" >End Date</th>
            <th className="text-center" >Days</th>
            <th className="text-center">Actions</th>
          </tr>
          </thead>
          <tbody>
          {periods.map((period, index) => (
            <tr key={period.id}>
              <td className="text-center">{period.id}</td>
              <td className="text-center" >{new Date(period.startDate).toDateString()}</td>
              <td className="text-center" >{new Date(period.endDate).toDateString()}</td>
              <td className="text-center" >{period.releaseDays}</td>
              <td>
                <Stack className="" direction="horizontal" >

                  <Button
                    className="mx-auto"
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(period.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
        )
        }

        {/* Overlay for loading spinner */}
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: "80px", // Adjust to align the spinner below the table header
              left: 0,
              width: "100%",
              height: "calc(100% - 40px)", // Exclude header height
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              zIndex: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReleasePeriodsTable
