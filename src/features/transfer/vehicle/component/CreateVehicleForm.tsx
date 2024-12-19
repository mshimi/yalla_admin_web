import { useState } from "react";
import { Container, Stack, Button, Spinner, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../../app/hooks";
import { showAddVehicleModal } from "../states/vehicleSlice";
import Vehicle from "../types/Vehicle";
import VehicleQuieres from "../controllers/VehicleQuieres";


interface VehicleFormProps {
    vehicle?: Vehicle;
  }
  
  const CreateVehicleForm: React.FC<VehicleFormProps> = ({ vehicle }) => {
    const [name, setName] = useState(vehicle?.name || "");
    const [maxPax, setMaxPax] = useState(vehicle?.maxPax || 0);
    const [minPax, setMinPax] = useState(vehicle?.minPax || 0);
    const [image, setImage] = useState<File | null>(null);
  
    const dispatch = useAppDispatch();
  

    const vehicleQuieres = VehicleQuieres;

    const uploadImage = vehicleQuieres.useUploadImage({
      onSuccess(data) {
        closeDialog();
      },
    });
  
    const createVehicle = vehicleQuieres.useCreate({
      onSuccess(data) {
        if (image) {
          uploadImage.mutate({ id: data.id, file: image });
        } else {
          closeDialog();
        }
      },
    });
  
    function closeDialog() {
      dispatch(showAddVehicleModal(false));
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createVehicle.mutate({ name, maxPax, minPax });
    };
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
      }
    };
  
    return (
      <Container className="my-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="vehicleName">
            <Form.Label>Vehicle Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="maxPax">
            <Form.Label>Max Pax</Form.Label>
            <Form.Control
              type="number"
              value={maxPax}
              onChange={(e) => setMaxPax(Number(e.target.value))}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="minPax">
            <Form.Label>Min Pax</Form.Label>
            <Form.Control
              type="number"
              value={minPax}
              onChange={(e) => setMinPax(Number(e.target.value))}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="vehicleImage">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
  
          <Stack className="mt-5">
            <Button variant="primary" type="submit" className="ms-auto">
              {createVehicle.isPending || uploadImage.isPending ? (
                <Spinner animation="border" />
              ) : (
                <span>Save</span>
              )}
            </Button>
          </Stack>
        </Form>
      </Container>
    );
  };
  
  export default CreateVehicleForm;