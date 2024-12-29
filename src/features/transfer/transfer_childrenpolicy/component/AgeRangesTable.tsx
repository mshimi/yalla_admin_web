import React from "react";
import { Table, Button } from "react-bootstrap";
import TransferChildrenPolicyQueries from "../controllers/TransferChildrenPolicyQueries";
import { BiPencil, BiTrash } from "react-icons/bi";
import { AgeRange } from "../types/AgeRange"


interface AgeRangesTableprobs {
  ageRanges: AgeRange[];
}

const AgeRangesTable: React.FC <AgeRangesTableprobs>= ({ageRanges}:AgeRangesTableprobs) => {

  return (
    <div>
      <h4>Age Ranges in Active Policy</h4>
      <Table striped bordered hover responsive>
        <thead>
        <tr>
          <th>Age From</th>
          <th>Age To</th>
          <th>Base Price</th>
          <th>Pax Value</th>
        </tr>
        </thead>
        <tbody>
        {ageRanges.map((ageRange, index) => (
          <tr key={index}>
            <td>{ageRange.ageFrom}</td>
            <td>{ageRange.ageTo}</td>
            <td>{ageRange.basePrice}</td>
            <td>{ageRange.paxValue}</td>

          </tr>
        ))}

        </tbody>
      </Table>
    </div>
  );
};

export default AgeRangesTable;