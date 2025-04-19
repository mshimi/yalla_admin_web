import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Language } from "../../../../common/enums/Language";
import { ExcursionItemTranslation } from "../types/ExcursionItemTranslation";
import ExcursionItemQueries from "../controllers/ExcursionItemQueries";
import { useAppDispatch } from "../../../../app/hooks";
import { addNotification } from "../../../../common/error_handlers/notificationSlice";

interface Props {
  itemId: number;
  existingTranslations: ExcursionItemTranslation[];
  onClose: () => void;
}

const EditExcursionItemForm: React.FC<Props> = ({ itemId, existingTranslations, onClose }) => {
  const [translations, setTranslations] = useState<ExcursionItemTranslation[]>([]);
  const [originalTranslations] = useState<ExcursionItemTranslation[]>([...existingTranslations]);
  const [errors, setErrors] = useState<Partial<Record<Language, string>>>({});
  const dispatch = useAppDispatch();

  const updateTranslations = ExcursionItemQueries.useUpdateTranslations();
  const deleteTranslation = ExcursionItemQueries.useDeleteTranslation();

  useEffect(() => {
    setTranslations([...existingTranslations]);
  }, [existingTranslations]);

  const availableLanguages = Object.values(Language).filter(
    (lang) => !translations.some((t) => t.lang === lang)
  );

  const handleChangeLang = (index: number, lang: Language) => {
    setTranslations((prev) => {
      const updated = [...prev];
      updated[index].lang = lang;
      return updated;
    });
  };

  const handleChangeName = (index: number, name: string) => {
    setTranslations((prev) => {
      const updated = [...prev];
      updated[index].name = name;
      return updated;
    });
  };

  const handleRemove = (lang: Language) => {
    const toRemove = translations.find((t) => t.lang === lang);
    if (toRemove?.id) {
      deleteTranslation.mutate({ itemId, lang }, {
        onSuccess: () => {
          dispatch(addNotification({ type: "success", message: `Translation ${lang} deleted.` }));
          setTranslations((prev) => prev.filter((t) => t.lang !== lang));
        },
        onError: (error: any) => {
          dispatch(addNotification({ type: "error", message: "Failed to delete translation", details: [error.message] }));
        }
      });
    } else {
      setTranslations((prev) => prev.filter((t) => t.lang !== lang));
    }
  };

  const handleAdd = () => {
    const lang = availableLanguages[0];
    if (lang) {
      setTranslations((prev) => [...prev, { id: null, lang, name: "" }]);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<Language, string>> = {};
    translations.forEach((t) => {
      if (!t.name.trim()) newErrors[t.lang] = "Name is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    updateTranslations.mutate({ itemId, translations }, {
      onSuccess: () => {
        dispatch(addNotification({ type: "success", message: "Translations updated" }));
        onClose();
      },
      onError: (error: any) => {
        dispatch(addNotification({ type: "error", message: "Failed to update translations", details: [error.message] }));
      }
    });
  };

  return (
    <Form>
      {translations.map((t, index) => (
        <Row key={index} className="align-items-end mb-3">
          <Col md={3}>
            <Form.Label>Language</Form.Label>
            <Form.Select
              value={t.lang}
              disabled={t.lang === Language.EN}
              onChange={(e) => handleChangeLang(index, e.target.value as Language)}
            >
              <option value={t.lang}>{t.lang}</option>
              {Object.values(Language)
                .filter((lang) => lang !== Language.EN && !translations.some((tr) => tr.lang === lang))
                .map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
            </Form.Select>
          </Col>
          <Col md={7}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={t.name}
              onChange={(e) => handleChangeName(index, e.target.value)}
              isInvalid={!!errors[t.lang]}
            />
            <Form.Control.Feedback type="invalid">{errors[t.lang]}</Form.Control.Feedback>
          </Col>
          <Col md={2} className="text-end">
            {t.lang !== Language.EN && (
              <Button variant="outline-danger" className="mt-4" onClick={() => handleRemove(t.lang)}>
                <FaTrash />
              </Button>
            )}
          </Col>
        </Row>
      ))}

      <div className="d-flex justify-content-between mt-3">
        <Button variant="outline-primary" onClick={handleAdd} disabled={availableLanguages.length === 0}>
          Add Language
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Update Translations
        </Button>
      </div>
    </Form>
  );
};

export default EditExcursionItemForm;
