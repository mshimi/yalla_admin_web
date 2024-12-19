import AsyncSelect from "react-select/async";
import { CityQueries } from "../controllers/CityQueries";
import City from "../types/City";
import CityService from "../service/CityService";

interface CityDropdownInputProps {
    value: City | null;
    onChange: (value: City | null) => void;
  }
  
  const CityDropdownInput: React.FC<CityDropdownInputProps> = ({ value, onChange }) => {
    const cityService = new CityService();
  
    // Function to load options dynamically
    const loadOptions = async (inputValue: string) => {
      const filters: Record<string, string> = inputValue
        ? { cityName: inputValue, cityCode: inputValue, logic: "OR" }
        : {};
  
      const data = await cityService.findAll( filters);
  
      if (!data) {
        return [];
      }
  
      return data.map((city: City) => ({
        value: city.id,
        label: `${city.cityName} (${city.cityCode})`,
        city: city,
      }));
    };
  
    // Handle selection change
    const handleChange = (selectedOption: any) => {
      onChange(selectedOption ? selectedOption.city : null);
    };
  
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        getOptionLabel={(e) => e.label}
        getOptionValue={(e) => e.value.toString()}
        value={value ? { value: value.id, label: `${value.cityName} (${value.cityCode})` } : null}
        placeholder="Select a city"
      />
    );
  };
  
  export default CityDropdownInput;