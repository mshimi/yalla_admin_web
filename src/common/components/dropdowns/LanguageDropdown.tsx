import { Form } from "react-bootstrap"
import { Language } from "../../enums/Language"

interface LanguageDropdownProps {
  selected: Language;
  onChange: (value: Language) => void;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
                                                             selected,
                                                             onChange,
                                                           }) => {
  return (
    <Form.Group>
      <Form.Label>Language</Form.Label>
      <Form.Select
        value={selected}
        onChange={(e) => onChange(e.target.value as Language)}
      >
        {Object.entries(Language).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default LanguageDropdown;