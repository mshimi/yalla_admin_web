import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import EditModal from "../../../../common/modals/EditModal";
import AreaDropdownInput from "../../area/component/AreaDropdownInput";
import Area from "../../area/types/Area";
import HotelQueries from "../controllers/HotelQueries";
import { selectEditHotel, setEditHotel } from "../states/hotelSlice";
import Hotel from "../types/Hotel";



  const EditHotelModal: React.FC = ({
  
  }) => {
    
    const editHotel  =   useAppSelector(selectEditHotel);
    const dispatch = useAppDispatch();
    const hotelQueries = HotelQueries;    

    const updateHotel = hotelQueries.useUpdate({
        onMutate() {
            
        },
        onSuccess: () => {
            dispatch(setEditHotel(null));
        }
    });
    
    if(editHotel === null){
        return null;
    }

    return (
      <EditModal<Hotel>
        
        show={editHotel !== null}
        onHide={()=>{
            dispatch(setEditHotel(null));
        }}
        entity={editHotel}
        onSave={(updatedEntity)=> {
            updateHotel.mutate({id:editHotel.id, entity: updatedEntity});
        }}
        fields={[
          {
            label: "Hotel Name",
            key: "hotelName",
            type: "text",
          },
          {
            label: "Area",
            key: "area",
            renderField: (value, onChange) => (
              <AreaDropdownInput
                value={value as Area | null}
                onChange={(area) => onChange(area!)}
              />
            ),
          },
        ]}
      />
    );
}
  ;
  
  export default EditHotelModal;