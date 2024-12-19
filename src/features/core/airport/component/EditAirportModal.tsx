import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import EditModal from "../../../../common/modals/EditModal";
import AreaDropdownInput from "../../area/component/AreaDropdownInput";
import Area from "../../area/types/Area";
import AirportQueries from "../controllers/AirportQueries";
import { selectEditAirport, setEditAirport } from "../states/airportSlice";
import Airport from "../types/Airport";

const EditAirportModal: React.FC = () => {
    const editAirport = useAppSelector(selectEditAirport);
    const dispatch = useAppDispatch();
    const airportQueries = AirportQueries;
  
    const updateAirport = airportQueries.useUpdate({
      onMutate() {},
      onSuccess: () => {
        dispatch(setEditAirport(null));
      },
    });
  
    if (editAirport === null) {
      return null;
    }
  
    return (
      <EditModal<Airport>
        show={editAirport !== null}
        onHide={() => {
          dispatch(setEditAirport(null));
        }}
        entity={editAirport}
        onSave={(updatedEntity) => {
          updateAirport.mutate({ id: editAirport.id, entity: updatedEntity });
        }}
        fields={[
          {
            label: "Airport Name",
            key: "airportName",
            type: "text",
          },
          {
            label: "Airport Code",
            key: "airportCode",
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
  };
  
  export default EditAirportModal;