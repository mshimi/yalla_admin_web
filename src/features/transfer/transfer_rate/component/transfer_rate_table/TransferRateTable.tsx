import { Table } from "react-bootstrap"
import TransferRateTableHeader from "./TransferRateTableHeader"
import TransferRateTableBody from "./TransferRateTableBody"
import React from "react"
import { useAppSelector } from "../../../../../app/hooks"
import { selectCurrentPage, selectFilters } from "../../states/transferRateSlice"
import TransferRateQueries from "../../controllers/TransferRateQueries"

const TransferRateTable:React.FC = () => {

  const currentPage = useAppSelector(selectCurrentPage);
  const transferfilters = useAppSelector(selectFilters);


  const {data} =  TransferRateQueries.useGetActiveTransferRates(currentPage,30,transferfilters  );


  return (
    <div className="d-flex flex-column flex-grow-1 overflow-hidden">
    <Table striped bordered hover responsive>
      <TransferRateTableHeader />
      <TransferRateTableBody transferRates={data?.content ? data.content : []}/>
    </Table>
    </div>
  );
}


export default TransferRateTable;