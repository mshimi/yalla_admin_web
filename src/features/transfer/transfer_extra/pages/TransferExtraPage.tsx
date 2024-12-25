import { Button, Col, Container, Row, Stack } from "react-bootstrap"
import TransferExtrasQueries from "../controllers/TransferExtrasQueries"
import React from "react"
import TransferExtraCard from "../component/TransferExtraCard"
import AddTransferExtraModal from "../component/add_new_transfer_extra/AddTransferExtraModal"


const TransferExtraPage: React.FC = () => {
  const { data: transferExtras, isLoading } = TransferExtrasQueries.useFindAllTransferExtras();
  const [showAddModal, setShowAddModal] = React.useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="my-4" >
      <Stack gap={4} direction="horizontal">
        <h1>Transfer Extras</h1>
        <Button
          variant="primary"
          className="ms-auto"
          onClick={() => setShowAddModal(true)}
        >
          Add New Transfer Extra
        </Button>
      </Stack>
      <Row>
        {transferExtras?.map(extra => (
          <Col
            key={extra.id}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className="mb-4"
          >
            <TransferExtraCard extra={extra} />
          </Col>
        ))}
      </Row>

      <AddTransferExtraModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
    </Container>
  )
};

export default TransferExtraPage;


