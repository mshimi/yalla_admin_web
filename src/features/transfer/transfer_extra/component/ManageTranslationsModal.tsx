import { Button, Form, ListGroup, Modal } from "react-bootstrap"
import TransferExtrasQueries from "../controllers/TransferExtrasQueries"
import { useState } from "react"
import { TransferExtraTranslation } from "../types/TransferExtra "
import { getLanguageFromString, Language } from "../../../../common/enums/Language"

const ManageTranslationsModal: React.FC<{
  show: boolean
  onHide: () => void
  extraId: number
}> = ({ show, onHide, extraId }) => {
  const [newTranslation, setNewTranslation] = useState<
    { lang: Language; name: string}
  >({ lang: Language.EN, name: "" })

  const { data: translations } =
    TransferExtrasQueries.useFindTranslationsByTransferExtraId(extraId)
  const { mutate: addTranslation } =
    TransferExtrasQueries.useAddOrUpdateTranslation()
  const { mutate: deleteTranslation } =
    TransferExtrasQueries.useDeleteTranslation()

  const handleAddTranslation = () => {
    addTranslation({ id: extraId, lang: newTranslation.lang, name: newTranslation.name })
    setNewTranslation({ lang: Language.EN, name: "" })
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage Translations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup className="mb-3">
          {translations?.map(t => (
            <ListGroup.Item key={t.id}>
              {t.lang}: {t.name}
              <Button
                variant="danger"
                size="sm"
                className="float-end"
                onClick={() => deleteTranslation(t.id)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Translation Name</Form.Label>
            <Form.Control
              type="text"
              value={newTranslation.name}
              onChange={e =>
                setNewTranslation({ ...newTranslation, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Language</Form.Label>
            <Form.Select
              value={newTranslation.lang}
              onChange={e =>
                {
                  console.log(e.target.value)
                  setNewTranslation(prevState => ({
                    ...prevState,
                    lang: e.target.value as Language,
                  }))
                }
              }
            >
              <option value={Language.EN}>English</option>
              <option value={Language.DE}>German</option>
              <option value={Language.FR}>French</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddTranslation}>
          Add Translation
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ManageTranslationsModal