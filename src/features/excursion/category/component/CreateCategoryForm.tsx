import { useState } from "react"
import { CategoryTranslation } from "../types/CategoryTranslation"
import { Language } from "../../../../common/enums/Language"
import { Alert, Button, Form, Tab, Tabs } from "react-bootstrap"
import { BiPlus } from "react-icons/bi"
import CategoryQueries from "../controllers/CategoryQueries"
import { UseMutationResult } from "@tanstack/react-query"
import { Category } from "../types/Category"
import { addNotification } from "../../../../common/error_handlers/notificationSlice"
import { useAppDispatch } from "../../../../app/hooks"

interface CreateCategoryFormProps {
  closeDialog: () => void;
}

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ closeDialog }) => {

  const [translations, setTranslations] = useState<CategoryTranslation[]>([
    { id: null, lang: Language.EN, name: "", description: "" },
  ]);

    const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<Language>(Language.EN);

  const [errors, setErrors] = useState<Partial<Record<Language, string[]>>>({});

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
      if (!prev[lang]) return prev;

      const filtered = prev[lang].filter((err) =>
        field === "name"
          ? err !== "Title is required"
          : err !== "Description is required"
      );

      const updated = { ...prev };

      if (filtered.length > 0) {
        updated[lang] = filtered;
      } else {
        delete updated[lang];
      }

      return updated;
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
        t.lang === oldLang
          ? { ...t, lang: newLang }
          : t
      )
    );
    setActiveTab(newLang);
  };


  const handleAddTab = () => {
    const existingLangs = translations.map((t) => t.lang);
    const availableLang = Object.values(Language).find((lang) => !existingLangs.includes(lang));
    if (availableLang) {
      setTranslations([
        ...translations,
        { id: null, lang: availableLang, name: "", description: "" },
      ]);
      setActiveTab(availableLang);
    }
  };

  const handleRemoveTab = (langToRemove: Language) => {
    setTranslations((prev) => prev.filter((t) => t.lang !== langToRemove));
    if (activeTab === langToRemove) {
      setActiveTab(Language.EN); // fallback to EN if current tab is removed
    }
  };

  const allLanguagesUsed = (): boolean => {
    return Object.values(Language).every((lang) =>
      translations.some((t) => t.lang === lang)
    );
  };

  const createCategory : UseMutationResult<Category,unknown,Category> =   CategoryQueries.useCreateCategory(
    {
      onSuccess: (data,variables,context)=> {
        dispatch(addNotification({ type: "success", message: "Category created successfully" }));
        closeDialog();
      },
      onError: (error) => {
        dispatch(addNotification({ type: "error", message: "Failed to Create Category" , details: [error.message]}));

      },



    }
  )


  const handleSave = async () => {
    if (validateForm()) {

        setLoading(true);


    await  createCategory.mutateAsync({
        id: null,
        translations: translations,
        imageId: null,
      })

      setLoading(false);

    }
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
      const firstInvalidLang = Object.keys(newErrors)[0] as Language;
      setActiveTab(firstInvalidLang);
      return false;
    }

    return true;
  };

  return (
    <Form>

      <Tabs
        id="category-language-tabs"
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className="mb-3"
      >
        {translations.map((t) => (
          <Tab
            eventKey={t.lang}
            key={t.lang}
            title={
              <span className={`d-flex align-items-center gap-1 ${errors[t.lang] ? 'text-danger' : ''}`}>
      {t.lang}
                {t.lang !== Language.EN && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation(); // prevent tab switching
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
                onChange={(e) => handleChangeLanguage(t.lang, e.target.value as Language)}
              >
                <option value={t.lang}>{t.lang}</option>
                {t.lang !== Language.EN &&
                  Object.values(Language)
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
                Title is required.
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
                Description is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Tab>
        ))}
        <Tab
          eventKey="add"
          title={<span >{<BiPlus/>}</span>}
          disabled={allLanguagesUsed()}

        />

      </Tabs>


      <div className="d-flex justify-content-end">
        <Button variant="success" onClick={handleSave}>
          {
            !loading ? "Save Category" : "loading"
          }
        </Button>
      </div>

    </Form>
  )
}

export default CreateCategoryForm;