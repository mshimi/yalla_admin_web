import TransferRate from "../types/TransferRate"
import ActiveStatusCheckbox from "./ActiveStatusCheckbox"
import { useState } from "react"
import ConfirmationModal from "./ConfirmationModal"
import TransferRateQueries from "../controllers/TransferRateQueries"
import { useAppDispatch } from "../../../../app/hooks"
import { addNotification } from "../../../../common/error_handlers/notificationSlice"

interface TransferRateTableBodyProps {
  transferRates: TransferRate[];
}

const TransferRateTableBody: React.FC<TransferRateTableBodyProps> = ({ transferRates }) => {

  const [showConfirmationModal, setShowConfirmationModal] = useState<null| {id:number,status:boolean}>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleOnStatusChange = (id:number, status:boolean) => {
    setShowConfirmationModal({id,status});
    if(isLoading) {
      setIsLoading(false);
    }
  }


 const {mutateAsync: inactiveTransferRate} = TransferRateQueries.useSetTransferRateInactive();
  const {mutateAsync: activeTransferRate } = TransferRateQueries.useSetTransferRateActive();

  const dispatch = useAppDispatch();

  const handleConfirm = async () => {
    if (showConfirmationModal) {
      const { id, status } = showConfirmationModal;

      if(status) {
      await  activeTransferRate(id, {
        onSuccess: (data,variables,context)=> {
          handleCloseModal();
          dispatch(addNotification(
            {
              message: "Transfer Rate Activated",
              details: ["Id ${data.id} has been successfully activated"],
              type: "success"
            }))
        },
        onError: ()=> {

        },
        onSettled: ()=> {}
      });
      } else {
      await  inactiveTransferRate(id, {
        onSuccess: ()=> {
          handleCloseModal();
          dispatch(addNotification(
            {
              message: "Transfer Rate Deactivated",
              details: ["Id ${data.id} has been successfully Deactivated"],
              type: "success"
            }))
        },
        onError: ()=> {},
        onSettled: ()=> {}
      });
      }

      // Hide modal
      setShowConfirmationModal(null);
    }
  };

  const handleCloseModal = () => setShowConfirmationModal(null);

  return (
<>
      <tbody  >
      {
        transferRates.length === 0 ? (<tr>
            <td colSpan={6}>No Transfer Rates</td>
          </tr>) :

          transferRates.map((rate, index) => (
            <tr key={rate.id}>
              <td>{rate.id}</td>
              <td>{rate.sourceArea.areaName}</td>
              <td>{rate.destinationArea.areaName}</td>
              <td>{rate.ratePerPerson.toFixed(2)}</td>
              <td>{new Date(rate.createdAt).toLocaleDateString()}</td>
              <td>

                <ActiveStatusCheckbox isActive={rate.isActive} onStatusChange={() => {
                  handleOnStatusChange(rate.id, !rate.isActive);
                }} />

              </td>
            </tr>
          ))}

      </tbody>


  {/* Confirmation Modal */}
  {showConfirmationModal && (
    <ConfirmationModal
      isLoading={isLoading}
      show={!!showConfirmationModal}
      onHide={handleCloseModal}
      onConfirm={handleConfirm}
      status={showConfirmationModal.status}
      transferRateId={showConfirmationModal.id}
    />
  )}

</>
      );
      };

      export default TransferRateTableBody;