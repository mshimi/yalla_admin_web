import AsyncSelect from "react-select/async";
import { Language } from "../../../../common/enums/Language";
import { TransferExtra } from "../types/TransferExtra "
import TransferExtraService from "../service/TransferExtraService"

interface TransferExtraDropdownInputProps {
  value: TransferExtra | null;
  onChange: (value: TransferExtra | null) => void;
  required?: boolean;
  lang?: Language; // Optional: to support multilingual name rendering
}

const TransferExtraDropdownInput: React.FC<TransferExtraDropdownInputProps> = ({
                                                                                 value,
                                                                                 onChange,
                                                                                 required,
                                                                                 lang = Language.EN, // Default language fallback
                                                                               }) => {
  const extraService =  TransferExtraService

  // Load options based on filter
  const loadOptions = async (inputValue: string) => {
    const filters: Record<string, string> = inputValue
      ? { "translations.name": inputValue }
      : {};

    const data = await extraService.getAllTransferExtras()

    if (!data) return [];

    return data.map((extra: TransferExtra) => {
      const translation = extra.translations.find(t => t.lang === lang) || extra.translations[0];
      const label = translation?.name || `Extra #${extra.id}`;

      return {
        value: extra.id,
        label,
        extra, // pass full object
      };
    });
  };

  const handleChange = (selectedOption: any) => {
    onChange(selectedOption ? selectedOption.extra : null);
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
          ? {
            value: value.id,
            label:
              value.translations.find(t => t.lang === lang)?.name ||
              `Extra #${value.id}`,
          }
          : null
      }
      placeholder="Select a transfer extra"
    />
  );
};

export default TransferExtraDropdownInput;
