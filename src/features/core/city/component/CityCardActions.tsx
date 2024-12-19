import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FaCity, FaImage, FaPencilAlt, FaTrashAlt, FaUpload } from "react-icons/fa";
import { useAppDispatch } from "../../../../app/hooks";
import { CityQueries } from "../controllers/CityQueries";
import City from "../types/City";
import { addNotification } from "../../../../common/error_handlers/notificationSlice";
import EditModal from "../../../../common/modals/EditModal";
import DeleteConfirmationModal from "../../../../common/modals/DeleteConfirmationModal";
import CountryDropdownInput from "../../country/component/CountryDropdownInput";
import Country from "../../country/types/Country";

const CityCardActions: React.FC<{ city: City }> = ({ city }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteImageDialog, setShowDeleteImageDialog] = useState(false);
  
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    const {
      useUploadCityImageMutation,
      useDeleteCityMutation,
      useUpdateCityMutation,
      useDeleteCityImageMutation,
    } = CityQueries();
  
    const deleteCityMutation = useDeleteCityMutation({
      onMutate: () => setShowDeleteDialog(false),
    });
  
    const [editCity, setEditCity] = useState({
      cityName: city.cityName,
      cityCode: city.cityCode,
      country: city.country || null, // Add country field
    });
  
    const updateCityMutation = useUpdateCityMutation({
      onSuccess: () => {
        dispatch(addNotification({ type: "success", message: "City updated successfully" }));
        setShowEditDialog(false);
      },
      onError: (error) => {
        // dispatch(addNotification({ type: "error", message: "Failed to update city" }));
      },
    });
  
    const uploadImageMutation = useUploadCityImageMutation();
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        uploadImageMutation.mutate({ id: city.id, file });
      }
    };
  
    const handleDelete = () => {
      deleteCityMutation.mutate(city.id, {
        onSuccess: () => {
          dispatch(addNotification({ type: "success", message: "City deleted successfully" }));
        },
      });
    };
  
    const handleEditSave = (updatedCite:City) => {
      
      
        updateCityMutation.mutate({
          id: city.id,
          city: updatedCite,
        });
      };
  
    const deleteCityImageMutation = useDeleteCityImageMutation();
  
    const handleDeleteImage = () => {
      setShowDeleteImageDialog(false);
      deleteCityImageMutation.mutate({ id: city.id });
    };
  
    return (
      <div className="d-flex mt-2 justify-content-around">
        {/* Edit Button */}
        <Button className="me-2" onClick={() => setShowEditDialog(true)}>
          <FaPencilAlt />
        </Button>
  
        {/* Delete Button */}
        <Button
          className="me-2"
          variant="danger"
          onClick={() => setShowDeleteDialog((prev) => !prev)}
        >
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
        <Button variant="info" onClick={() => console.log("Go to related details clicked")}>
          <FaCity />
        </Button>
  
        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationModal
          show={showDeleteDialog}
          onHide={() => setShowDeleteDialog(false)}
          onConfirm={handleDelete}
          entityName={city.cityName}
        />
  
        {/* Edit City Dialog */}
        <EditModal<City>
          show={showEditDialog}
          onHide={() => setShowEditDialog(false)}
          entity={city}
          onSave={handleEditSave}
          fields={[
            { label: "City Name", key: "cityName" },
            { label: "City Code", key: "cityCode" },
            {
              label: "Country",
              key: "country",
              renderField: (value, onChange) => (
                <CountryDropdownInput
                  value={value as Country | null}
                  onChange={(country) => onChange(country as Country)}
                />
              ),
            },
          ]}
        />
  
        {/* Delete Image Confirmation Dialog */}
        <DeleteConfirmationModal
          show={showDeleteImageDialog}
          onHide={() => setShowDeleteImageDialog(false)}
          onConfirm={handleDeleteImage}
          entityName={`${city.cityName}'s image`}
        />
      </div>
    );
  };
  
  export default CityCardActions;