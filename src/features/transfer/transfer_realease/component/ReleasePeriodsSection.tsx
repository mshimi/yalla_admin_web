import { Button, Stack } from "react-bootstrap"
import ReleasePeriodsTable from "./ReleasePeriodsTable"
import AddReleasePeriodModal from "./AddReleasePeriodModal"
import { useState } from "react"
import { format } from "date-fns" // Install date-fns for date formatting

import ReleaseQueries from "../controllers/ReleaseQueries"
import DeleteConfirmationModal from "../../../../common/modals/DeleteConfirmationModal"
import BackToGeneralModal from "./BackToGeneralModal"

const ReleasePeriodsSection: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false)

  const [showDeleteModal, setShowDeleteModal] =  useState<number|null>(null)
  const [showModal, setShowModal] = useState(false);


  const { data, isLoading, error } = ReleaseQueries.useFindAllReleases();

  const handleSaveNewRelease = ReleaseQueries.useAddReleasePeriod();
  const handleDeleteRelease = ReleaseQueries.useSetReleaseInactive();



  const handleSuccess = () => {
    console.log("Back to General Release completed!");
    // Refresh your data or update UI
  };

  const handleAddPeriod = (newPeriod: {
    startDate: string
    endDate: string
    days: number
  }) => {
    const releasePeriod: Partial<TransferRelease> = {
      startDate: newPeriod.startDate,
      endDate: newPeriod.endDate,
      releaseDays: newPeriod.days,
      isGeneral: false,
    }



    handleSaveNewRelease.mutateAsync(releasePeriod, {
      onSuccess: () => {
        setShowAddModal(false)
      },
    })
  }

  return (
    <>
      <Stack gap={3}>
        <Stack direction="horizontal" className="justify-content-between">
          <h4>Release Periods</h4>
         <Stack gap={2} direction="horizontal" >
           <Button
             variant="danger"
             onClick={() => {
              setShowModal(true);
             }}
           >
             back to General Release
           </Button>

           <Button
             variant="primary"
             onClick={() => {
               setShowAddModal(true)
             }}
           >
             Add New Period
           </Button>

         </Stack>
        </Stack>
        <ReleasePeriodsTable
          periods={data}
          onDelete={id => {
            setShowDeleteModal(id);
          }}
          isLoading={isLoading}
          error={error ? error.message : undefined}
        />
      </Stack>
      <AddReleasePeriodModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddPeriod}
      />

      <BackToGeneralModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSuccess={handleSuccess}
      />

      <DeleteConfirmationModal
        show={showDeleteModal !== null }
        onHide={
          ()=> {
            setShowDeleteModal(null)
          }
        }
        onConfirm={ () => {
          handleDeleteRelease.mutateAsync(showDeleteModal!, {
           onSuccess: () => {
            setShowDeleteModal(null)
           }
         });
        }}
        entityName={"Release Period"}
      />
    </>
  )
}

export default ReleasePeriodsSection
