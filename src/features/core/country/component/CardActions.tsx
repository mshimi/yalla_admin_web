import { Button, Form, Modal } from "react-bootstrap";
import { FaCity, FaImage, FaPencilAlt, FaTrashAlt, FaUpload } from "react-icons/fa";
import { useAppDispatch } from "../../../../app/hooks";
import { useRef, useState } from "react";
import { CountryQueries } from "../controllers/CountryQueries";
import Country from "../types/Country";
import { addNotification } from "../../../../common/error_handlers/notificationSlice";
import EditModal from "../../../../common/modals/EditModal";
import DeleteConfirmationModal from "../../../../common/modals/DeleteConfirmationModal";

const CardActions : React.FC<{country:Country}> = ({country}) => {

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteImageDialog, setShowDeleteImageDialog] = useState(false);


    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { useUploadCountryImageMutation, useDeleteCountryMutation, useUpdateCountryMutation, useDeleteCountryImageMutation } = CountryQueries();
    const deleteCountryMutation = useDeleteCountryMutation({onMutate() {
        setShowDeleteDialog(false);
    },});

    const [editCountry, setEditCountry] = useState({
      countryName: country.countryName,
      countryCode: country.countryCode,
    });
  
    const updateCountryMutation = useUpdateCountryMutation({
      onSuccess: () => {
        dispatch(addNotification({ type: "success", message: "Country updated successfully" }));
        setShowEditDialog(false);
      },
      onError: () => {
        dispatch(addNotification({ type: "error", message: "Failed to update country" }));
      },
    });

    const uploadImageMutation = useUploadCountryImageMutation({});
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        uploadImageMutation.mutate({ id: country.id, file });
      }
    };

    const handleDelete = () => {
        deleteCountryMutation.mutate(country.id, {
          onSuccess: () => {
            dispatch(addNotification({ type: "success", message: "Country deleted successfully" }));
          },
          
          
        });
      };

      const handleEditSave = (updatedCountry: typeof country) => {
        updateCountryMutation.mutate({
          id: country.id,
          country: updatedCountry,
        });
      };

      const deleteCountryImageMutation = useDeleteCountryImageMutation();

      const handleDeleteImage = () => {
        setShowDeleteImageDialog(false);
        deleteCountryImageMutation.mutate({id:country.id});
      };


    return (
        <div className="d-flex mt-2 justify-content-around">
        {/* Edit Button */}
<Button className="me-2" onClick={() => setShowEditDialog(true)}>
  <FaPencilAlt />
 
</Button>

{/* Delete Button */}
<Button className="me-2" variant="danger" onClick={() => {setShowDeleteDialog((prev)=> {return !prev})}}>
  <FaTrashAlt />

</Button>

{/* Upload Image Button */}
<Button className="me-2" variant="secondary" onClick={() => fileInputRef.current?.click()}>
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

{/* Delete Image Button */}
<Button className="me-2" variant="warning" onClick={() => setShowDeleteImageDialog(true)}>
  <FaImage />
</Button>

{/* Go to Cities Button */}
<Button variant="info" onClick={() => console.log("Go to Cities clicked")}>
  <FaCity />
</Button>
        


  {/* Delete Confirmation Dialog */}
  <DeleteConfirmationModal
        show={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        entityName={country.countryName}
      />


       {/* Edit Country Dialog */}
       <EditModal
        show={showEditDialog}
        onHide={() => setShowEditDialog(false)}
        entity={country}
        onSave={handleEditSave}
        fields={[
          { label: "Country Name", key: "countryName" },
          { label: "Country Code", key: "countryCode" },
        ]}
      />


 {/* Delete Image Confirmation Dialog */}
 <DeleteConfirmationModal
        show={showDeleteImageDialog}
        onHide={() => setShowDeleteImageDialog(false)}
        onConfirm={handleDeleteImage}
        entityName={`${country.countryName}'s image`}
      />

      </div>
    );
};

export default CardActions;