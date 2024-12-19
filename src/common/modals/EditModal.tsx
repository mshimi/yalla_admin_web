import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
interface EditModalProps<T> {
  show: boolean;
  onHide: () => void;
  entity: T;
  onSave: (updatedEntity: T) => void;
  fields: {
    label: string;
    key: keyof T;
    type?: string;
    renderField?: (
      value: T[keyof T],
      onChange: (value: T[keyof T]) => void
    ) => React.ReactNode; // Use T[keyof T] for type consistency
   
  }[];
  errorMessage?:string;
}

const EditModal = <T,>({
  show,
  onHide,
  entity,
  onSave,
  fields,
errorMessage,
}: EditModalProps<T>) => {
  const [updatedEntity, setUpdatedEntity] = React.useState<T>(entity);

  const handleChange = (key: keyof T, value: T[keyof T]) => {
    setUpdatedEntity({ ...updatedEntity, [key]: value });
  };

  const handleSave = () => {
    onSave(updatedEntity);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Entity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {fields.map(({ label, key, type = "text", renderField }) => (
            <Form.Group className="mb-3" key={key as string}>
              <Form.Label>{label}</Form.Label>
              {renderField ? (
                renderField(updatedEntity[key], (value) =>
                  handleChange(key, value)
                )
              ) : (
                <Form.Control
                  type={type}
                  value={String(updatedEntity[key] || "")}
                  onChange={(e) => handleChange(key, e.target.value as T[keyof T])}
                />
              )}
            </Form.Group>
          ))}
        </Form>
          {
            errorMessage&&(
              <div className=".bg-danger.bg-gradient text-white bg-opacity-10">
                {errorMessage}
              </div>
            )
          }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;