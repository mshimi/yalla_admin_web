import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import CategoryQueries from "../controllers/CategoryQueries"
import { useDispatch } from "react-redux"
import { addNotification } from "../../../../common/error_handlers/notificationSlice"

type UploadImageModalProps = {
  show: boolean;
  onClose: () => void;
  categoryId: number

};

const UploadCategoryImageModal: React.FC<UploadImageModalProps> = ({
                                                             show,
                                                             onClose,
                                                                     categoryId
                                                           }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const uploadImageMutation = CategoryQueries.useUploadImage(
    {
      onMutate: ()=> {
        setIsLoading(true);
      },
      onError: (error, variables, context)=> {
        dispatch(addNotification({ type: "error", message: "Something went wrong", details: [error.message] }));

      },
      onSuccess: ()=> {
        dispatch(addNotification({ type: "success", message: "Image Uploaded Successfully" }));

        handleClear()
        onClose();
      },
    }
  )




  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedFile) {

      await uploadImageMutation.mutateAsync({id: categoryId, file: selectedFile })

    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setIsLoading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Modal show={show} onHide={onClose} centered>
  <Modal.Header closeButton>
  <Modal.Title>Upload Image</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div
    onDrop={handleDrop}
  onDragOver={handleDragOver}
  className="border rounded text-center p-4 mb-3"
  style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
  onClick={() => inputRef.current?.click()}
>
  {selectedFile ? (
    <p className="mb-0">{selectedFile.name}</p>
  ) : (
    <p className="mb-0">Drag and drop an image here, or click to select</p>
  )}
  </div>
  <Form.Control
  type="file"
  accept="image/*"
  ref={inputRef}
  onChange={handleFileChange}
  className="d-none"
    />
    </Modal.Body>
    <Modal.Footer>
    {selectedFile && (
      <Button variant="secondary" onClick={handleClear}>
    Clear
    </Button>
)}
  <Button variant="secondary" onClick={onClose}>
    Cancel
    </Button>
    <Button
  variant="success"
  onClick={handleUpload}
  disabled={!selectedFile}
>
  Upload
  </Button>
  </Modal.Footer>
  </Modal>
);
};

export default UploadCategoryImageModal;
