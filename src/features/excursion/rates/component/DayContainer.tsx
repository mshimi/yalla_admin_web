interface DayProps {
    date: string | null; // Null for empty cells
    isOffer?: boolean; // Indicates if it's an offer day
  }
  
  const DayContainer: React.FC<DayProps> = ({ date, isOffer }) => {
    if (!date) {
      return <div className="border text-center py-3 bg-light h-100"></div>; // Empty cell for padding
    }
  
    const dayNumber = new Date(date).getDate(); // Extract the day number
  
    return (
      <div className={`border text-center py-3 ${isOffer ? "bg-success text-white" : "bg-secondary text-white"}`}>
        <div className="fw-bold">{dayNumber}</div>
        <div>{isOffer ? "Offer" : "No Offer"}</div>
      </div>
    );
  };
  
  export default DayContainer;
