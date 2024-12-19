import { useState } from "react";
import EditModal from "../../../../common/modals/EditModal";
import CityDropdownInput from "../../city/component/CityDropdownInput";
import Area from "../types/Area";
import City from "../../city/types/City";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectEditArea, setEditArea } from "../states/areaSlice";
import AreaQueries from "../controllers/AreaQueries";

interface EditAreaModalProps {
   
  }
  
  const EditAreaModal: React.FC<EditAreaModalProps> = ({
  
  }) => {
    
    const editArea  =   useAppSelector(selectEditArea);
    const dispatch = useAppDispatch();
    const areaQueries = AreaQueries;    

    const updateArea = areaQueries.useUpdate({
        onMutate() {
            
        },
        onSuccess: () => {
            dispatch(setEditArea(null));
        }
    });
    
    if(editArea === null){
        return null;
    }

    return (
      <EditModal<Area>
        
        show={editArea !== null}
        onHide={()=>{
            dispatch(setEditArea(null));
        }}
        entity={editArea}
        onSave={(updatedEntity)=> {
            updateArea.mutate({id:editArea.id, entity: updatedEntity});
        }}
        fields={[
          {
            label: "Area Name",
            key: "areaName",
            type: "text",
          },
          {
            label: "City",
            key: "city",
            renderField: (value, onChange) => (
              <CityDropdownInput
                value={value as City | null}
                onChange={(city) => onChange(city)}
              />
            ),
          },
        ]}
      />
    );
}
  ;
  
  export default EditAreaModal;