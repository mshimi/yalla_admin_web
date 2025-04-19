import { useEffect, useState } from "react";
import { Alert, Button, Form, Tab, Tabs } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import { Language } from "../../../../common/enums/Language";
import { CategoryTranslation } from "../types/CategoryTranslation";
import CategoryQueries from "../controllers/CategoryQueries";
import { useAppDispatch } from "../../../../app/hooks";
import { addNotification } from "../../../../common/error_handlers/notificationSlice";

interface Props {
  categoryId: number;
  existingTranslations: CategoryTranslation[];
  onSuccess: () => void;
}

const EditCategoryTranslationsForm: React.FC<Props> = ({ categoryId, existingTranslations, onSuccess }) => {
  const [translations, setTranslations] = useState<CategoryTranslation[]>([...existingTranslations]);
  const [originalTranslations] = useState<CategoryTranslation[]>([...existingTranslations]);
  const [activeTab, setActiveTab] = useState<Language>(existingTranslations[0].lang);
  const [errors, setErrors] = useState<Partial<Record<Language, string[]>>>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const deleteTranslation = CategoryQueries.useDeleteTranslation();
  const updateTranslations = CategoryQueries.useUpdateTranslations();

  useEffect(() => {
    checkForChanges();
  }, [translations]);

  const checkForChanges = () => {
    const isChanged = JSON.stringify(translations) !== JSON.stringify(originalTranslations);
    setHasChanges(isChanged);
  };

  const handleChange = (
    lang: Language,
    field: keyof CategoryTranslation,
    value: string
  ) => {
    setTranslations((prev) =>
      prev.map((t) =>
        t.lang === lang ? { ...t, [field]: value } : t
      )
    );

    setErrors((prev) => {
      const currentErrors = prev[lang] || [];
      const updatedErrors = currentErrors.filter(
        (err) =>
          !(field === "name" && err === "Title is required") &&
          !(field === "description" && err === "Description is required")
      );

      if (updatedErrors.length > 0) {
        return { ...prev, [lang]: updatedErrors };
      } else {
        const updated = { ...prev };
        delete updated[lang];
        return updated;
      }
    });
  };

  const handleTabSelect = (k: string | null) => {
    if (k === "add") {
      handleAddTab();
    } else if (k) {
      setActiveTab(k as Language);
    }
  };

  const handleChangeLanguage = (oldLang: Language, newLang: Language) => {
    setTranslations((prev) =>
      prev.map((t) =>
        t.lang === oldLang ? { ...t, lang: newLang } : t
      )
    );
    setActiveTab(newLang);
  };

  const handleAddTab = () => {
    const usedLangs = translations.map((t) => t.lang);
    const availableLang = Object.values(Language).find((lang) => !usedLangs.includes(lang));
    if (availableLang) {
      setTranslations([...translations, {
        id: null,
        lang: availableLang,
        name: "",
        description: ""
      }]);
      setActiveTab(availableLang);
    }
  };

  const handleRemoveTab = (lang: Language) => {
    const toRemove = translations.find((t) => t.lang === lang);
    if (toRemove?.id) {
      handleDeleteTranslation(categoryId, lang);
    }

    setTranslations((prev) => prev.filter((t) => t.lang !== lang));
    if (activeTab === lang) setActiveTab(Language.EN);
  };

  const handleDeleteTranslation = (categoryId: number, lang: Language) => {
    deleteTranslation.mutate({ categoryId, lang }, {
      onSuccess: () => {
        dispatch(addNotification({ type: "success", message: `Translation ${lang} deleted.` }));
        onSuccess();
      },
      onError: (error: any) => {
        dispatch(addNotification({ type: "error", message: "Failed to delete translation.", details: [error.message] }));
      }
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<Language, string[]>> = {};

    translations.forEach((t) => {
      const langErrors: string[] = [];
      if (!t.name.trim()) langErrors.push("Title is required");
      if (!t.description.trim()) langErrors.push("Description is required");
      if (langErrors.length > 0) newErrors[t.lang] = langErrors;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstLangWithError = Object.keys(newErrors)[0] as Language;
      setActiveTab(firstLangWithError);
      return false;
    }

    return true;
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    updateTranslations.mutate({ categoryId, translations }, {
      onSuccess: () => {
        dispatch(addNotification({ type: "success", message: "Translations updated successfully." }));
      },
      onError: (error: any) => {
        dispatch(addNotification({ type: "error", message: "Failed to update translations.", details: [error.message] }));
      }
    });
  };

  const allLanguagesUsed = (): boolean =>
    Object.values(Language).every((lang) =>
      translations.some((t) => t.lang === lang)
    );

  return (
    <Form>
      <Tabs
        id="category-translation-tabs"
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className="mb-3"
      >
        {translations.map((t) => (
          <Tab
            key={t.lang}
            eventKey={t.lang}
            title={
              <span className="d-flex align-items-center gap-1">
                {t.lang}
                {t.lang !== Language.EN && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTab(t.lang);
                    }}
                    className="ms-2 rounded-circle"
                    style={{ width: "1rem", height: "1rem", padding: 0, fontSize: "0.50rem", lineHeight: 1 }}
                  >
                    ✕
                  </Button>
                )}
              </span>
            }
          >
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Select
                value={t.lang}
                disabled={t.lang === Language.EN}
                onChange={(e) =>
                  handleChangeLanguage(t.lang, e.target.value as Language)
                }
              >
                <option value={t.lang}>{t.lang}</option>
                {Object.values(Language)
                  .filter((lang) => !translations.some((tr) => tr.lang === lang))
                  .map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={t.name}
                onChange={(e) => handleChange(t.lang, "name", e.target.value)}
                isInvalid={errors[t.lang]?.includes("Title is required")}
              />
              <Form.Control.Feedback type="invalid">
                Title is required
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={t.description}
                onChange={(e) => handleChange(t.lang, "description", e.target.value)}
                isInvalid={errors[t.lang]?.includes("Description is required")}
              />
              <Form.Control.Feedback type="invalid">
                Description is required
              </Form.Control.Feedback>
            </Form.Group>
          </Tab>
        ))}

        <Tab
          eventKey="add"
          title={<span><BiPlus /></span>}
          disabled={allLanguagesUsed()}
        />
      </Tabs>

      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          onClick={handleUpdate}
          disabled={!hasChanges}
        >
          Update Translations
        </Button>
      </div>
    </Form>
  );
};

export default EditCategoryTranslationsForm;
