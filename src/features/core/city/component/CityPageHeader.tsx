import  { Button, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import citySlice from "../states/CitySlice";

const CityPageHeader : React.FC =()=> {

    const {selectCurrentPage, selectAddCityModalVisible} = citySlice.selectors;


    const dispatch = useAppDispatch();
    const pageNumber = useAppSelector(selectCurrentPage);
    const selectedCity = useAppSelector(selectAddCityModalVisible);


return (
    <Stack direction="horizontal" className="p-1 " gap={3}>
    <h2>Cities</h2>
  

    
      <Button className="ms-auto" size="sm" disabled= {selectedCity === null} variant="warning" onClick={() => {}}>
      Edit City
    </Button>

    <Button disabled= {selectedCity === null} size="sm"  variant="danger" onClick={() => {}}>
      Delete City
    </Button>

    <Button size="sm"  variant="success" onClick={() => {}}>
        Add City
      </Button>
  </Stack>
);
    
}

export default CityPageHeader;
