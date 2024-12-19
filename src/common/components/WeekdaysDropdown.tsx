import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

interface WeekdaysDropdownProps {
    value: string[]; // Array of selected weekdays
    onChange: (selected: string[]) => void; // Callback to update the parent state

  }
  
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const WeekdaysDropdown: React.FC<WeekdaysDropdownProps> = ({ value, onChange }) => {
    const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>(weekdays); // Default to all weekdays
  
    const handleToggleDay = (day: string) => {
      const updatedSelection = selectedWeekdays.includes(day)
        ? selectedWeekdays.filter((d) => d !== day)
        : [...selectedWeekdays, day];
  
      setSelectedWeekdays(updatedSelection);
      onChange(updatedSelection);
    };
  
    const handleSelectAll = () => {
      const allSelected = selectedWeekdays.length === weekdays.length;
      const newSelection = allSelected ? [] : weekdays;
      setSelectedWeekdays(newSelection);
      onChange(newSelection);
    };
  
    return (
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="weekdays-dropdown">
          {selectedWeekdays.length === weekdays.length
            ? "All Weekdays"
            : selectedWeekdays.length > 0
            ? selectedWeekdays.join(", ")
            : "Select Weekdays"}
        </Dropdown.Toggle>
        <Dropdown.Menu>

          {weekdays.map((day) => (
            <Form.Check
              key={day}
              type="checkbox"
              id={`checkbox-${day}`}
              label={day}
              checked={selectedWeekdays.includes(day)}
              onChange={() => handleToggleDay(day)}
              className="ms-3"
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  
  export default WeekdaysDropdown;