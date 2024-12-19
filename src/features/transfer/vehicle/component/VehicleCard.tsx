import type React from "react"
import { Button, Card, Stack } from "react-bootstrap"
import Vehicle from "../types/Vehicle"
import VehicleImagePlaceHolder from "../../../../assets/placeholders/country_image.webp"
import { FaImage, FaPencilAlt, FaTrashAlt, FaUpload } from "react-icons/fa"
import VehicleQuieres from "../controllers/VehicleQuieres"
import { useAppDispatch } from "../../../../app/hooks"
import { addNotification } from "../../../../common/error_handlers/notificationSlice"
import { useRef, useState } from "react"
import DeleteConfirmationModal from "../../../../common/modals/DeleteConfirmationModal"
import EditModal from "../../../../common/modals/EditModal"

interface VehicleCardProps {
  vehicle: Vehicle
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const dispatch = useAppDispatch()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [showDeleteImageDialog, setShowDeleteImageDialog] = useState(false)

  const [showEditDialog, setShowEditDialog] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadImage.mutate({ id: vehicle.id, file })
    }
  }

  const vehicleQuieres = VehicleQuieres

  function handleOnSuccess(message: string) {
    dispatch(addNotification({ type: "success", message: message }))
  }

  const updateVehicle = vehicleQuieres.useUpdate({
    onSuccess(data) {
      handleOnSuccess("Country Updated Successfully");
      setShowEditDialog(() => false);
    },
  })
  const uploadImage = vehicleQuieres.useUploadImage({
    onSuccess(data) {
      handleOnSuccess("Image Uploaded Successfully")
     
    },
  })
  const deleteVehicle = vehicleQuieres.useDelete({
    onSuccess(data) {
      handleOnSuccess("Country deleted Successfully")
    },
  })
  const deleteImage = vehicleQuieres.useDeleteImage({
    onSuccess(data) {
      handleOnSuccess("Image Deleted Successfully")
    },
  })

  const cardImageWrapperStyle: React.CSSProperties = {
    height: "200px", // Set a fixed height for the image container
    overflow: "hidden", // Prevent overflow for large images
  }

  const cardImageStyle: React.CSSProperties = {
    height: "100%", // Fill the height of the container
    width: "100%", // Fill the width of the container
    objectFit: "cover", // Ensure the image fits and maintains aspect ratio
    objectPosition: "center", // Center the image within the container
  }

  return (
    <>
      <Card className="h-100">
        <div style={cardImageWrapperStyle}>
          <Card.Img
            style={cardImageStyle}
            title="Vehicle_image"
            alt="Vehicle Image"
            variant="top"
            src={
              vehicle.imageId
                ? `/api/images/${vehicle.imageId}`
                : VehicleImagePlaceHolder
            }
          />
        </div>
        <Card.Body>
          <Stack>
            <div>
              <Card.Title>
                <b>{vehicle.name}</b>
              </Card.Title>
              <Card.Text>
                <div className="d-flex flex-row justify-content-around">
                  <span>
                    {" "}
                    <b>Min Pax: </b> {vehicle.minPax}
                  </span>
                  <span>
                    {" "}
                    <b>Min Pax: </b> {vehicle.maxPax}
                  </span>
                </div>
              </Card.Text>
            </div>
            <Stack
              direction="horizontal"
              className="justify-content-around mt-3"
            >
              <Button variant="primary">
                <FaImage />
              </Button>
              <Button variant="primary" onClick={()=> {setShowEditDialog(true)}} >
                <FaPencilAlt />
              </Button>
              <Button
                variant="danger"
                disabled={vehicle.imageId === null}
                onClick={() => {
                  setShowDeleteImageDialog(true)
                }}
              >
                <FaTrashAlt />
              </Button>
              {/* {Upload Image} */}
              <Button
                variant="success"
                onClick={() => fileInputRef.current?.click()}
              >
                <FaUpload />
              </Button>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="d-none"
                onChange={handleFileChange}
              />
            </Stack>
          </Stack>
        </Card.Body>
      </Card>

      {/* Delete Image Confirmation Dialog */}
      <DeleteConfirmationModal
        show={showDeleteImageDialog}
        onHide={() => setShowDeleteImageDialog(false)}
        onConfirm={() => {
          deleteImage.mutate(vehicle.id)
          setShowDeleteImageDialog(() => false)
        }}
        entityName={`${vehicle.name}'s image`}
      />

      <EditModal<Vehicle>
        show={showEditDialog}
        onHide={ ()=>{
         setShowEditDialog(() => false);
        }}
        entity={vehicle}
        onSave={function (updatedEntity: Vehicle): void {
          updateVehicle.mutate({ id: vehicle.id, entity: updatedEntity })
        
        }}
        fields={[
          { label: "Name", key: "name", type: "text" },
          { label: "Min Pax", key: "minPax", type: "number" },
          { label: "Max Pax", key: "maxPax", type: "number" },


        ]}
        errorMessage="Some Thing wrong"
      />
    </>
  )
}

export default VehicleCard
