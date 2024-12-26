import { Button, Spinner, Table } from "react-bootstrap"
import React from "react"
import { Language } from "../../../../../common/enums/Language"
import { BiTrash } from "react-icons/bi"

interface LanguageTableProps<T> {
  translations: T[]
  onDelete: (item: T) => void
  deleteProcessing?: number
}

const LanguagesTable = <T extends { id:number|null;  lang: Language; name: string }>({
  translations,
  onDelete,
  deleteProcessing,
}: LanguageTableProps<T>) => {
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

        {translations.map((t, index) => (
          <tr key={index}>
            <td>{t.lang}</td>
            <td>{t.name}</td>
            <td>
              <Button
                active={t.id !== null && deleteProcessing === t.id}
                variant="danger"
                size="sm"
                onClick={() => onDelete(t)}
              >

                {
                  deleteProcessing === t.id ? <Spinner animation="border" size="sm" role="status" /> :<BiTrash />
                }


              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
export default LanguagesTable
