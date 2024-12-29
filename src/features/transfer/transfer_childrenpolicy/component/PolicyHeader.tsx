import { Button, Stack } from "react-bootstrap"
import { BiPlus } from "react-icons/bi"
import FormModal from "../../../../common/modals/FormModal"
import { useState } from "react"
import CreatePolicyForm from "./CreatePolicyForm"

const PolicyHeader: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <Stack  className="align-items-md-center   flex-md-row " >
      <Stack>
        <h3>Manage Transfer Children Policies</h3>
        View, update, and manage policies and age ranges for transfers
      </Stack>
      <div className="pt-2 pt-md-0 ms-dm-auto">
        <Button onClick={()=> {
          setShowModal(true)
        }}  >
          <BiPlus className="me-2" />
          <span >
            Add policy
          </span>

        </Button>
      </div>


      <FormModal
        show={showModal}
        title={"Add Children Policy"}
        onHide={()=> {
          setShowModal(false)
        }}
      >
      <CreatePolicyForm  onSuccessfulSubmit={()=> {
        setShowModal(false)
      }} />

      </FormModal>


    </Stack>
  );

}

export default PolicyHeader;


