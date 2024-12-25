import { useState } from "react"
import TransferExtrasQueries from "../controllers/TransferExtrasQueries"
import { Button, Form, Modal } from "react-bootstrap"

const UploadImageModal: React.FC<{ show: boolean; onHide: () => void; extraId: number }> = ({
                                                                                              show,
                                                                                              onHide,
                                                                                              extraId,
                                                                                            }) => {
  const [file, setFile] = useState<File | null>(null);
  const { mutate: uploadImage } = TransferExtrasQueries.useUploadImage();

  const handleUpload = () => {
    if (file) {
      uploadImage({ id: extraId, file });
      setFile(null);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Choose Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setFile(target.files?.[0] || null);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadImageModal;