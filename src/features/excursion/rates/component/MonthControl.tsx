import React, { useState } from "react";
import { Stack, Button } from "react-bootstrap";
import dayjs, { Dayjs } from "dayjs";

interface MonthControlProps {
  onMonthChange: (month: Dayjs) => void;
}

const MonthControl: React.FC<MonthControlProps> = ({ onMonthChange }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  const handlePreviousMonth = () => {
    const newMonth = currentMonth.subtract(1, "month");
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth.add(1, "month");
    setCurrentMonth(newMonth);
    onMonthChange(newMonth);
  };

  return (
    <Stack direction="horizontal" className="justify-content-between align-items-center mb-4">
      <Button variant="secondary" onClick={handlePreviousMonth}>
        &lt;
      </Button>
      <h4>{currentMonth.format("MMMM YYYY")}</h4>
      <Button variant="secondary" onClick={handleNextMonth}>
        &gt;
      </Button>
    </Stack>
  );
};

export default MonthControl;