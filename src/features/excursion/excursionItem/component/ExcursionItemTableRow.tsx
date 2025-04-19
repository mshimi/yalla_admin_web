import { Button } from "react-bootstrap"
import React, { useState } from "react"
import { ExcursionItemAdmin } from "../types/ExcursionItemAdmin"
import FormModal from "../../../../common/modals/FormModal"
import EditExcursionItemForm from "./EditExcursionItemForm"

interface props {
  adminItem: ExcursionItemAdmin
}

const ExcursionItemTableRow: React.FC<props> = ({adminItem}) => {

  const [editOpen, setEditOpen] = useState(false);

  const en = adminItem.item.translations.find(t => t.lang === "EN")
  return (
    <>
    <tr key={adminItem.item.id}>
      <td>{adminItem.item.id}</td>
      <td>{en?.name || <i>No EN name</i>}</td>
      <td>
        {adminItem.missingLanguages.length > 0
          ? adminItem.missingLanguages.join(", ")
          : "Complete"}
      </td>
      <td>
        <Button size="sm" variant="primary"  onClick={()=> setEditOpen(true)} >Edit</Button>
      </td>




    </tr>
  <FormModal
    title="Edit Excursion Item"
    show={editOpen}
    onHide={() => setEditOpen(false)}
  >
    <EditExcursionItemForm
      itemId={adminItem.item.id!}
      existingTranslations={adminItem.item.translations}
      onClose={() => setEditOpen(false)}
    />
  </FormModal>

    </>
  )
}

export default ExcursionItemTableRow