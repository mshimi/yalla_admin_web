import { Button, Form, ListGroup, Modal } from "react-bootstrap"
import TransferExtrasQueries from "../controllers/TransferExtrasQueries"
import { useState } from "react"
import { TransferExtraTranslation } from "../types/TransferExtra "
import { getLanguageFromString, Language } from "../../../../common/enums/Language"
import AddNewLanguageForm from "./add_new_transfer_extra/AddNewLanguageForm"
import LanguagesTable from "./add_new_transfer_extra/LanguagesTable"

const ManageTranslationsModal: React.FC<{
  show: boolean
  onHide: () => void
  extraId: number
}> = ({ show, onHide, extraId }) => {


 const [itemDeleteProcessing, setItemDeleteProcessing] = useState<number|undefined>();



  const { data: translations, isLoading:loading } =
    TransferExtrasQueries.useFindTranslationsByTransferExtraId(extraId)
  const { mutateAsync: addTranslation } =
    TransferExtrasQueries.useAddOrUpdateTranslation()
  const { mutateAsync: deleteTranslation } =
    TransferExtrasQueries.useDeleteTranslation(extraId);

  const handleAddTranslation = async ({lang,name}:{lang:Language,name:string}) => {

    await addTranslation({name:name,lang:lang, id:extraId},{
      onSuccess: () => {

      },
      onError: (error) => {
        console.log(error)
      }
    });

  }

  const handleDeleteTranslation = async (trans:TransferExtraTranslation) => {
    setItemDeleteProcessing(trans.id!);
  await  deleteTranslation(trans.id!,{

    onSettled:()=> {
      setItemDeleteProcessing(undefined);
    },
      onSuccess: () => {

      },
      onError: (error) => {
        console.log(error)
      },

    })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage Translations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5> add new Language </h5>
          <AddNewLanguageForm onSubmit={handleAddTranslation} />
        </div>
        <hr />
        <LanguagesTable<TransferExtraTranslation> deleteProcessing={itemDeleteProcessing} translations={translations ? translations : []} onDelete={(item)=> {
          handleDeleteTranslation(item);
        }}/>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  )
}

export default ManageTranslationsModal