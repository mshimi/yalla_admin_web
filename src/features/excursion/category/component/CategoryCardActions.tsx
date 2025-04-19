import { Category } from "../types/Category"
import { CategoryAdmin } from "../types/CategoryAdmin"
import {
  Button,
  Col,
  Modal,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap"
import {
  FaEdit,
  FaEllipsisV,
  FaExclamationTriangle,
  FaTrash,
  FaUpload,
} from "react-icons/fa"
import EditCategoryTranslationsForm from "./EditCategoryTranslationsForm"
import { useState } from "react"
import UploadImageModal from "../../../transfer/transfer_extra/component/UploadImageModal"
import DeleteImageModal from "./DeleteCategoryImageModal"
import CategoryQueries from "../controllers/CategoryQueries"
import UploadCategoryImageModal from "./UploadCategoryImageModal"
import ConfirmationModal from "./ConfirmationModal"
import { useDispatch } from "react-redux"
import { addNotification } from "../../../../common/error_handlers/notificationSlice"

type CategoryActionsProps = {
  category: CategoryAdmin
}

const CategoryActions: React.FC<CategoryActionsProps> = ({
  category,

}) => {
  const [showTranslationsModal, setShowTranslationsModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState<{
    show: boolean;
    loading: boolean;
  }>({ show: false, loading: false });  const dispatch = useDispatch()

  const deleteImageMutation = CategoryQueries.useDeleteImage()
  const deleteCategoryMutation = CategoryQueries.useDeleteCategory({
    onSuccess: data => {
      setConfirmationModal(
        prevState => {
          return {
            show: false,
            loading: false,
          }
        }
      )
      dispatch(
        addNotification({
          type: "success",
          message: "Category deleted successfully",
        }),
      )
    },
    onError: error => {

      setConfirmationModal(
        prevState => {
          return {
            show: true,
            loading: false,
          }
        }
      )

      dispatch(
        addNotification({
          type: "error",
          message: "Something went wrong",
          details: [error.message]
        }),
      )
    }
  })

  const tooltipText =
    category.missingLanguages.length === 0
      ? "All translations are complete"
      : category.missingLanguages.length === 1
        ? `${category.missingLanguages[0]} is missing`
        : `${category.missingLanguages.join(", ")} are missing`

  return (
    <>
      <Row>
        <Col>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Show Translations</Tooltip>}
          >
            <Button
              variant="light"
              size="sm"
              onClick={() => setShowTranslationsModal(true)}
            >
              <FaEllipsisV />
            </Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                {category.category.imageId !== null
                  ? "Delete Image"
                  : "Upload Image"}
              </Tooltip>
            }
          >
            <Button
              variant="light"
              size="sm"
              onClick={() => {
                if (category.category.imageId === null) {
                  setShowUploadModal(true)
                } else {
                  setShowDeleteModal(true)
                }
              }}
            >
              {category.category.imageId !== null ? <FaTrash /> : <FaUpload />}
            </Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{tooltipText}</Tooltip>}
          >
            <Button
              disabled={category.missingLanguages.length === 0}
              variant="light"
              size="sm"
              onClick={() => {}}
            >
              <FaExclamationTriangle
                style={{
                  color:
                    category.missingLanguages.length !== 0
                      ? "darkgoldenrod"
                      : "grey",
                }}
              />
            </Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Delete Category</Tooltip>}
          >
            <Button variant="light" size="sm" onClick={()=> {
              setConfirmationModal(
                prevState => {
                  return {
                    show: true,
                    loading: false,
                  }
                }
              )
            }}>
              <FaTrash />
            </Button>
          </OverlayTrigger>
        </Col>
      </Row>

      <Modal
        show={showTranslationsModal}
        onHide={() => setShowTranslationsModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Translations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCategoryTranslationsForm
            onSuccess={() => setShowTranslationsModal(false)}
            categoryId={category.category.id!}
            existingTranslations={category.category.translations}
          />
        </Modal.Body>
      </Modal>

      <UploadCategoryImageModal
        show={showUploadModal}
        onClose={function (): void {
          setShowUploadModal(false)
        }}
        categoryId={category.category.id!}
      />

      <DeleteImageModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={() => {
          deleteImageMutation.mutate(category.category.id!)
          setShowDeleteModal(false)
        }}
      />

      <ConfirmationModal
        loading={confirmationModal.loading}
        show={confirmationModal.show}
        onCancel={() => setConfirmationModal({show: false,loading: false})}
        header={"Delete Category Confirmation"}
        message={"Are you sure you want to delete this category?"}
        onSubmit={async function(): Promise<void> {
          await deleteCategoryMutation.mutateAsync(category.category.id!)
        }}
      />
    </>
  )
}

export default CategoryActions
