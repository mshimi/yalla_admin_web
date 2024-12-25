import { Button, Table } from "react-bootstrap"
import React from "react"
import { Language } from "../../../../../common/enums/Language"
import { BiTrash } from "react-icons/bi"
import { TransferExtraTranslation } from "../../types/TransferExtra "

 interface LanguageTableProps  {
  translations: Partial<TransferExtraTranslation>[],
   onDelete: ({lang, name} : Partial<TransferExtraTranslation>) => void,
 }



const LanguagesTable:React.FC<LanguageTableProps> = ({translations, onDelete}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
      <tr>
        <th>Language</th>
        <th>Name</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {translations.length === 0 && (
        <tr>
          <td className="text-center" colSpan={3}>
            Please add Translations
          </td>
        </tr>
      )}

      {translations.map(t => (
        <tr key={t.lang}>
          <td>{t.lang}</td>
          <td>{t.name}</td>
          <td>
            <Button variant="danger" size="sm" onClick={() => onDelete(t)}>
              <BiTrash/>
            </Button>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  )
}

export default LanguagesTable