import React, { useRef, useState } from "react"
import { Card, Button, Stack, OverlayTrigger, Tooltip } from "react-bootstrap"
import { TransferExtra } from "../types/TransferExtra "
import ManageTranslationsModal from "./ManageTranslationsModal"
import UploadImageModal from "./UploadImageModal"
import TransferExtrasQueries from "../controllers/TransferExtrasQueries"
import { addNotification } from "../../../../common/error_handlers/notificationSlice"
import DeleteConfirmationModal from "../../../../common/modals/DeleteConfirmationModal"
import { FaBan, FaPencilAlt, FaTrashAlt, FaUpload } from "react-icons/fa"
import { useAppDispatch } from "../../../../app/hooks";
import placeholder from "../../../../assets/placeholders/country_image.webp";

interface TransferExtraCardProps {
  extra: TransferExtra;
}

const TransferExtraCard: React.FC<TransferExtraCardProps> = ({ extra }) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [showDeleteImageDialog, setShowDeleteImageDialog] = useState(false);
  const [showTranslationsModal, setShowTranslationsModal] = useState(false);

  const { mutate: setAsNotValid } = TransferExtrasQueries.useSetAsNotValid();
  const { mutate: uploadImage } = TransferExtrasQueries.useUploadImage();
  const { mutate: deleteImage } = TransferExtrasQueries.useDeleteImage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage({ id: extra.id, file });
    }
  };

  const handleSetAsInactive = () => {
    setAsNotValid(extra.id);
    dispatch(addNotification({ type: "success", message: "Extra set as inactive successfully" }));
  };

  return (
    <>
      <Card className="shadow-sm h-100">
        <div style={{ height: "180px", overflow: "hidden", borderRadius: "0.5rem 0.5rem 0 0" }}>
          <Card.Img
            title="Transfer Extra Image"
            alt="Transfer Extra Image"
            variant="top"
            src={
              extra.imageId != null
                ? `/api/images/${extra.imageId}`
                : placeholder
            }
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <Card.Body>
          <Card.Title className="text-center">
            {extra.translations[0]?.name || "Unnamed Extra"}
          </Card.Title>
          <Card.Text className="text-center">
            <strong>Pax Value:</strong> {extra.paxValue}
          </Card.Text>
          <Stack
            direction="horizontal"
            className="justify-content-between mt-3"
            style={{ gap: "0.5rem" }}
          >
            <OverlayTrigger
              overlay={<Tooltip>Manage Translations</Tooltip>}
            >
              <Button variant="info" onClick={() => setShowTranslationsModal(true)}>
                <FaPencilAlt />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Delete Image</Tooltip>}>
              <Button
                variant="danger"
                disabled={!extra.imageId}
                onClick={() => setShowDeleteImageDialog(true)}
              >
                <FaTrashAlt />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Upload Image</Tooltip>}>
              <Button variant="success" onClick={() => fileInputRef.current?.click()}>
                <FaUpload />
              </Button>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Set as Inactive</Tooltip>}>
              <Button variant="warning" onClick={handleSetAsInactive}>
                <FaBan />
              </Button>
            </OverlayTrigger>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="d-none"
              onChange={handleFileChange}
            />
          </Stack>
        </Card.Body>
      </Card>

      {/* Delete Image Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteImageDialog}
        onHide={() => setShowDeleteImageDialog(false)}
        onConfirm={() => {
          deleteImage(extra.id);
          setShowDeleteImageDialog(false);
          dispatch(addNotification({ type: "success", message: "Image deleted successfully" }));
        }}
        entityName={`${extra.translations[0]?.name || "Unnamed Extra"}'s image`}
      />

      {/* Manage Translations Modal */}
      <ManageTranslationsModal
        show={showTranslationsModal}
        onHide={() => setShowTranslationsModal(false)}
        extraId={extra.id}
      />
    </>
  );
};

export default TransferExtraCard;
