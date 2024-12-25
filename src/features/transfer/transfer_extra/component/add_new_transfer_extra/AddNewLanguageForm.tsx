import { Button, Col, Form, Row } from "react-bootstrap"
import { Language } from "../../../../../common/enums/Language"
import { BiPlus } from "react-icons/bi"
import { useState } from "react"

const AddNewLanguageForm:React.FC<{onSubmit:({lang,name}:{lang:Language, name: string})=>void}> = ({onSubmit})=>{

  const [lang, setLang] = useState<Language>(Language.EN);
  const [name, setName] = useState<string>("");
  const [isNameValid, setIsNameValid] = useState<boolean>(false);
  
  const onLangChange = (lang:Language) => {
    setLang(lang);
  }
  const onAddTranslation = () => {
    if(name.trim() === ""){
      setIsNameValid(true);
    } else {
      onSubmit({lang,name})
      setName("");
      setIsNameValid(false);
      setLang(Language.EN);
    }
  }
  
  
  return (
    <Form>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Group>
            <Form.Label>Translation Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              isInvalid={isNameValid}
              onChange={e => {
                setName(e.target.value)
                setIsNameValid(e.target.value.trim() === "")
              }}
            />
            <Form.Control.Feedback type="invalid">
              Name cannot be empty
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group>
            <Form.Label>Language</Form.Label>
            <Form.Select
              value={lang}
              onChange={e => onLangChange(e.target.value as Language)}
            >
              <option value={Language.EN}>English</option>
              <option value={Language.DE}>German</option>
              <option value={Language.FR}>French</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={2} className="d-flex align-items-end">
          <Button variant="primary" onClick={onAddTranslation}>
            <BiPlus />
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddNewLanguageForm;