import AsyncSelect from "react-select/async";
import { Language } from "../../../../common/enums/Language";
import TransferExtraService from "../service/TransferExtraService";
import { MultiValue, ActionMeta } from "react-select";
import { TransferExtra } from "../types/TransferExtra "

interface TransferExtraMultiSelectInputProps {
  value: TransferExtra[];
  onChange: (value: TransferExtra[]) => void;
  required?: boolean;
  lang?: Language;
}

const TransferExtraMultiSelectInput: React.FC<TransferExtraMultiSelectInputProps> = ({
                                                                                       value,
                                                                                       onChange,
                                                                                       required,
                                                                                       lang = Language.EN,
                                                                                     }) => {
  const extraService = TransferExtraService;

  const loadOptions = async (inputValue: string) => {
    const data = await extraService.getAllTransferExtras();

    if (!data) return [];

    return data.map((extra: TransferExtra) => {
      const translation = extra.translations.find((t) => t.lang === lang) || extra.translations[0];
      const label = translation?.name || `Extra #${extra.id}`;

      return {
        value: extra.id,
        label,
        extra,
      };
    });
  };

  const handleChange = (
    selectedOptions: MultiValue<{
      value: number;
      label: string;
      extra: TransferExtra;
    }>,
    _actionMeta: ActionMeta<any>
  ) => {
    const selectedExtras = selectedOptions.map((option) => option.extra);
    onChange(selectedExtras);
  };

  return (
    <AsyncSelect
      required={required}
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      getOptionLabel={(e) => e.label}
      getOptionValue={(e) => e.value.toString()}
      value={value.map((extra) => ({
        value: extra.id,
        label:
          extra.translations.find((t) => t.lang === lang)?.name || `Extra #${extra.id}`,
        extra,
      }))}
      placeholder="Select one or more extras"
    />
  );
};

export default TransferExtraMultiSelectInput;
