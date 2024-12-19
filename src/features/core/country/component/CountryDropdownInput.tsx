
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import Country from "../types/Country";
import { CountryQueries } from "../controllers/CountryQueries";
import AsyncSelect from "react-select/async";
import CountryService from "../service/CountryService";
interface CountryDropdownInputProps {
  value: Country | null; // The selected country is a full Country object or null
  onChange: (value: Country | null) => void; // Updates with the full Country object or null
}

const CountryDropdownInput: React.FC<CountryDropdownInputProps> = ({
  value,
  onChange,
}) => {
  const { useCountryQueries } = CountryQueries();

  // Function to load options dynamically
  const loadOptions = async (inputValue: string) => {
    const filters: Record<string, string> = inputValue
      ? { countryName: inputValue, countryCode: inputValue, logic: "OR" }
      : { countryName: "", countryCode: "", logic: "" };

      const countryService = new CountryService();

    // const { data } =  useCountryQueries({ pageNumber: 0, filters: filters });

      const data = await countryService.findAll(filters);

    if (!data) {
      return [];
    }

    return data.map((country: Country) => ({
      value: country.id,
      label: `${country.countryName} (${country.countryCode})`,
      country: country, // Pass the full country object
    })) as { value: number; label: string; country: Country }[];
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      placeholder="Search for a country"
      value={
        value
          ? { value: value.id, label: `${value.countryName} (${value.countryCode})`, country: value }
          : null
      }
      onChange={(selectedOption: { value: number; label: string; country: Country } | null) => {
        onChange(selectedOption ? selectedOption.country : null);
      }}
      noOptionsMessage={() => "No countries found"}
    />
  );
};

export default CountryDropdownInput;