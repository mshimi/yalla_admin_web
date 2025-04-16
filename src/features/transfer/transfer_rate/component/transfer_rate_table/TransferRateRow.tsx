import { useEffect, useState } from "react";
import ActiveStatusCheckbox from "../ActiveStatusCheckbox";
import TransferRate from "../../types/TransferRate";
import "./TransferRateRow.css";

interface TransferRateRowProps {
  rate: TransferRate;
  onStatusChange: (id: number, status: boolean) => void; // Notify parent about status change
}

const TransferRateRow: React.FC<TransferRateRowProps> = ({ rate, onStatusChange }) => {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (isUpdated) {
      const timeout = setTimeout(() => setIsUpdated(false), 5000); // Reset update state after 2 seconds
      return () => clearTimeout(timeout);
    }
  }, [isUpdated]);

  const handleStatusChange = () => {
    setIsUpdated(true);
    onStatusChange(rate.id, !rate.isActive); // Notify parent about the change
  };

  return (
    <tr
      className={isUpdated ? "table-warning" : ""}
      style={{
        transition: "background-color 0.5s ease", // Smooth transition for background color
      }}
    >
      <td>{rate.id}</td>
      <td>{rate.sourceArea.areaName}</td>
      <td>{rate.destinationArea.areaName}</td>
      <td>{rate.ratePerPerson.toFixed(2)}</td>
      <td>{rate.release}</td>
      <td>{new Date(rate.createdAt).toLocaleDateString()}</td>
      <td>
        <ActiveStatusCheckbox
          isActive={rate.isActive}
          onStatusChange={handleStatusChange}
        />
      </td>
    </tr>
  );
};

export default TransferRateRow;