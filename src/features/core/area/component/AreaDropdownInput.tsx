import AsyncSelect from "react-select/async";
import AreaService from "../service/AreaService";
import Area from "../types/Area";

interface AreaDropdownInputProps {
    value: Area | null;
    onChange: (value: Area | null) => void;
    required?: boolean;
  }
  
  const AreaDropdownInput: React.FC<AreaDropdownInputProps> = ({ value, onChange, required }) => {
    const areaQueries = new AreaService();
  
    // Function to load options dynamically
    const loadOptions = async (inputValue: string) => {
      const filters: Record<string, string> = inputValue
        ? { areaName: inputValue, "city.cityName": inputValue, logic: "OR" }
        : {};
  
      const  data  = await areaQueries.findAll(filters);
  
      if (!data) {
        return [];
      }
  
      return data.map((area: Area) => ({
        value: area.id,
        label: `${area.areaName} (${area.city.cityName})`,
        area: area, // Pass the full area object
      }));
    };
  
    // Handle selection change
    const handleChange = (selectedOption: any) => {
      onChange(selectedOption ? selectedOption.area : null);
    };
  
    return (
      <AsyncSelect
        required={required}
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        getOptionLabel={(e) => e.label}
        getOptionValue={(e) => e.value.toString()}
        value={
          value
            ? { value: value.id, label: `${value.areaName} (${value.city.cityName})` }
            : null
        }
        placeholder="Select an area"
      />
    );
  };
  
  export default AreaDropdownInput;
  