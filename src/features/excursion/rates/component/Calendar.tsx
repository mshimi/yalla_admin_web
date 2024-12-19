import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import dayjs, { Dayjs } from "dayjs";
import DayContainer from "./DayContainer";
interface CalendarProps {
    currentMonth: Dayjs; // The month to display
    getDayData: (date: string) => { date: string; isOffer: boolean } | null; // Function to fetch data for a specific day
  }
  
  const Calendar: React.FC<CalendarProps> = ({ currentMonth, getDayData }) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    // Generate days for the calendar grid
    const generateCalendarDays = () => {
      const startOfMonth = currentMonth.startOf("month");
      const endOfMonth = currentMonth.endOf("month");
  
      const startDay = startOfMonth.day(); // 0 (Sunday) to 6 (Saturday)
      const totalDays = endOfMonth.date();
  
      const calendarDays: (ReturnType<typeof getDayData> | null)[] = Array(startDay).fill(null); // Leading empty cells
      for (let day = 1; day <= totalDays; day++) {
        const date = startOfMonth.date(day).format("YYYY-MM-DD");
        calendarDays.push(getDayData(date));
      }
  
      // Trailing empty cells to complete the grid
      while (calendarDays.length % 7 !== 0) {
        calendarDays.push(null);
      }
  
      return calendarDays;
    };
  
    const calendarDays = generateCalendarDays();
  
    return (
      <Container>
        {/* Weekday Headers */}
        <Row className="text-center fw-bold">
          {daysOfWeek.map((day) => (
            <Col key={day} className="border py-2">
              {day}
            </Col>
          ))}
        </Row>
  
        {/* Calendar Grid */}
        {Array.from({ length: calendarDays.length / 7 }).map((_, rowIndex) => (
          <Row key={rowIndex}>
            {calendarDays.slice(rowIndex * 7, rowIndex * 7 + 7).map((dayData, colIndex) => (
              <Col key={colIndex} className="p-0">
                <DayContainer date={dayData?.date || null} isOffer={dayData?.isOffer} />
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    );
  };
  
  export default Calendar;