import { Alert, Button, Container, Spinner, Stack } from "react-bootstrap"
import ActivePolicyCard from "../component/ActivePolicyCard"
import AgeRangesTable from "../component/AgeRangesTable"
import CreatePolicyForm from "../component/CreatePolicyForm"
import PolicyHeader from "../component/PolicyHeader"
import TransferChildrenPolicyQueries from "../controllers/TransferChildrenPolicyQueries"
import FormModal from "../../../../common/modals/FormModal"

const ManageChildrenPoliciesPage: React.FC = () => {

    const {data, isLoading} =  TransferChildrenPolicyQueries.useGetActivePolicy();



  return (
    <Container fluid={true} className="">
      <PolicyHeader />

      <Stack gap={4} className="my-4">
        {isLoading && <Spinner />}
        {data &&
          (typeof data === "object" && "id" in data && "ageRanges" in data ? (
            <>
              <ActivePolicyCard id={data.id} ageRanges={data.ageRanges} />
              <AgeRangesTable ageRanges={data.ageRanges}></AgeRangesTable>
            </>
          ) : (
            <Alert variant="info">
              <h5 className="mb-2">No Active Children Policy</h5>
              <p>There is currently no active children policy defined.</p>
              <p className="mb-0">
                <strong>Note:</strong> Any child, regardless of age, will be
                calculated as an adult.
              </p>
            </Alert>
          ))}
      </Stack>


    </Container>
  )
}

export default ManageChildrenPoliciesPage
