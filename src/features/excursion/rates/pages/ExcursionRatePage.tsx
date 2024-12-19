import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import MonthControl from "../component/MonthControl";
import Calendar from "../component/Calendar";

const ExcurstionRatePage : React.FC = () => {

    const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs().startOf("month"));

    // Mock function to fetch data for a specific day
    const getDayData = (date: string) => {
      const isOffer = Math.random() > 0.5; // Randomly decide if it's an offer
      return { date, isOffer };
    };

    return (
        <Container>
        <div className="d-flex justify-content-between align-items-center my-4">
          <Button
            variant="secondary"
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          >
            &lt; Previous
          </Button>
          <h4>{currentMonth.format("MMMM YYYY")}</h4>
          <Button
            variant="secondary"
            onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
          >
            Next &gt;
          </Button>
        </div>
        <Calendar currentMonth={currentMonth} getDayData={getDayData} />
      </Container>
    );
  };


export default ExcurstionRatePage;