import React, { useState } from "react"
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap"
import TransferExtrasQueries from "../../controllers/TransferExtrasQueries"

import { TransferExtraTranslation } from "../../types/TransferExtra "
import AddNewLanguageForm from "./AddNewLanguageForm"
import LanguagesTable from "./LanguagesTable"
import { Language } from "../../../../../common/enums/Language"

interface AddTransferExtraModalProps
{
  show: boolean
  onHide: () => void
}

const AddTransferExtraModal: React.FC<AddTransferExtraModalProps> = ({ show, onHide }: AddTransferExtraModalProps) => {
  const [paxValue, setPaxValue] = useState(1)

  const [translations, setTranslations] = useState<
    Partial<TransferExtraTranslation>[]
  >([])



  const {
    mutate: saveTransferExtra,
    mutateAsync: saveTransferExtraAsync,
  } = TransferExtrasQueries.useSaveTransferExtra();



  const handleSave = async ()  => {
  await  saveTransferExtraAsync({
      paxValue,
      translations: translations,
    },
    {
      onSuccess: () => {
        onHide();
      },
      onError: (error) => {
        console.log(error)
      }
    }
    )
    }



    


  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Transfer Extra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Pax Value</Form.Label>
            <Form.Control
              type="number"
              value={paxValue}
              onChange={e => setPaxValue(Number(e.target.value))}
            />
          </Form.Group>
          <AddNewLanguageForm
            onSubmit={({ lang, name }) =>
             {
               setTranslations((prevTranslations) => {
                 // Find if a translation already exists with the given lang
                 const existingTranslation = prevTranslations.find((t) => t.lang === lang);

                 if (existingTranslation) {
                   // If exists, update the name of this element
                   return prevTranslations.map((t) =>
                     t.lang === lang ? { ...t, name } : t
                   );
                 }

                 // If not, add a new translation
                 return [...prevTranslations, { lang, name }];
               });
             }
            }
          />
        </Form>

    <LanguagesTable translations={translations} onDelete={(trans: Partial<TransferExtraTranslation>)=> {
      setTranslations(prevTranslations =>{
        return prevTranslations.filter(t => t.lang !== trans.lang)
      })
    }}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddTransferExtraModal