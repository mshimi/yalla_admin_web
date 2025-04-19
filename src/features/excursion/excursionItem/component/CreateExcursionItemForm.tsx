import React, { useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import { ExcursionItemTranslation } from "../types/ExcursionItemTranslation"
import { Language } from "../../../../common/enums/Language"
import { FaTrash, FaPlus } from "react-icons/fa"
import ExcursionItemQueries from "../controllers/ExcursionItemQueries"
import { useAppDispatch } from "../../../../app/hooks"
import { addNotification } from "../../../../common/error_handlers/notificationSlice"

type Props = {
  closeDialog: () => void
}

const CreateExcursionItemForm: React.FC<Props> = ({ closeDialog }) => {
  const [translations, setTranslations] = useState<ExcursionItemTranslation[]>([
    { id: null, lang: Language.EN, name: "" },
  ])
  const [errors, setErrors] = useState<Partial<Record<Language, string>>>({})
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const createItem = ExcursionItemQueries.useCreateItem({
    onSuccess: () => {
      dispatch(addNotification({ type: "success", message: "Excursion item created" }))
      closeDialog()
    },
    onError: (error) => {
      dispatch(addNotification({ type: "error", message: "Failed to create item", details: [error.message] }))
    }
  })

  const availableLanguages = Object.values(Language).filter(
    (lang) => !translations.some((t) => t.lang === lang)
  )

  const handleAddLanguage = () => {
    const nextLang = availableLanguages[0]
    if (nextLang) {
      setTranslations([...translations, { id: null, lang: nextLang, name: "" }])
    }
  }

  const handleRemoveLanguage = (lang: Language) => {
    setTranslations(translations.filter((t) => t.lang !== lang))
  }

  const handleLangChange = (index: number, newLang: Language) => {
    const updated = [...translations]
    updated[index].lang = newLang
    setTranslations(updated)
  }

  const handleNameChange = (index: number, name: string) => {
    const updated = [...translations]
    updated[index].name = name
    setTranslations(updated)
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<Language, string>> = {}

    translations.forEach((t) => {
      if (!t.name.trim()) {
        newErrors[t.lang] = "Name is required"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setLoading(true)
    await createItem.mutateAsync({ id: null, translations })
    setLoading(false)
  }

  return (
    <Form className="p-2">
      {translations.map((t, index) => (
          <Row key={t.lang} className="align-items-end mb-2">
        <Col md={3}>
          <Form.Label>Language</Form.Label>
          <Form.Select
        value={t.lang}
        onChange={(e) => handleLangChange(index, e.target.value as Language)}
  disabled={t.lang === Language.EN}
  >
  <option value={t.lang}>{t.lang}</option>
  {Object.values(Language)
    .filter((lang) => lang !== Language.EN && !translations.some((tr) => tr.lang === lang))
    .map((lang) => (
      <option key={lang} value={lang}>
    {lang}
    </option>
  ))}
  </Form.Select>
  </Col>
  <Col md={7}>
    <Form.Label>Name</Form.Label>
    <Form.Control
  type="text"
  value={t.name}
  onChange={(e) => handleNameChange(index, e.target.value)}
  isInvalid={!!errors[t.lang]}
  />
  <Form.Control.Feedback type="invalid">{errors[t.lang]}</Form.Control.Feedback>
    </Col>
    <Col md={2} className="text-end">
    {t.lang !== Language.EN && (
        <Button
          variant="outline-danger"
      onClick={() => handleRemoveLanguage(t.lang)}
  className="mt-4"
    >
    <FaTrash />
    </Button>
)}
  </Col>
  </Row>
))}

  <div className="d-flex justify-content-between mt-3">
  <Button
    variant="outline-primary"
  onClick={handleAddLanguage}
  disabled={availableLanguages.length === 0}
  >
  <FaPlus className="me-1" />
    Add Language
  </Button>

  <Button variant="success" onClick={handleSave} disabled={loading}>
    {loading ? "Saving..." : "Save Excursion Item"}
    </Button>
    </div>
    </Form>
)
}

export default CreateExcursionItemForm
