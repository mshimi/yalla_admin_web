
import React, { useState } from "react";
import { Button, Container, Table, Modal, Form, Stack } from "react-bootstrap";
import TransferRate from "../types/TransferRate";
import AreaDropdownInput from "../../../core/area/component/AreaDropdownInput";
import Area from "../../../core/area/types/Area";
import FormModal from "../../../../common/modals/FormModal";
import TransferRateTableHeader from "../component/transfer_rate_table/TransferRateTableHeader"
import TransferRateTableBody from "../component/transfer_rate_table/TransferRateTableBody"
import TransferRateQueries from "../controllers/TransferRateQueries"
import { selectCurrentPage, selectFilters } from "../states/transferRateSlice"
import { useAppSelector } from "../../../../app/hooks"
import TransferRateTable from "../component/transfer_rate_table/TransferRateTable"
import Pagination from "react-bootstrap/Pagination"
import PaginationComponenet from "../../../../common/components/pagination_componenet/PaginationComponenet"
import CreateNewRateModal from "../component/transfer_rate_table/CreateNewRateModal"

const TransferRatePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);






  return (
    <Container fluid>
      <div
        className="d-flex flex-column"
        style={{ height: "calc(100vh - 68px)" }}
      >
        <div className="d-flex align-items-center justify-content-between my-4">
          <h2>Transfer Rate Management</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Rate
          </Button>
        </div>

        <TransferRateTable />

        <div className="d-flex justify-content-center py-1">
          <PaginationComponenet
            pageInfo={{ size: 50, totalPages: 3, number: 1, totalElements: 50 }}
            onPageChange={page => {}}
          />
        </div>
      </div>

      <CreateNewRateModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </Container>
  )
};


export default TransferRatePage;