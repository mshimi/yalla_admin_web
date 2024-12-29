import React, { useState } from "react";
import { Form, Button, Stack, Table, Row, Col, Spinner, Alert } from "react-bootstrap"
import TransferChildrenPolicyQueries from "../controllers/TransferChildrenPolicyQueries";
import { AgeRange } from "../types/AgeRange"
import AddRangeForm from "./AddAgeRangeForm"


interface CreatePolicyFormProps {
  onSuccessfulSubmit: () => void;
}

const CreatePolicyForm: React.FC<CreatePolicyFormProps> = ({onSuccessfulSubmit}) => {
  const [ageRanges, setAgeRanges] = useState<AgeRange[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { mutateAsync: createPolicy, isPending } = TransferChildrenPolicyQueries.useCreateNewPolicyWithAgeRanges();



 

  const handleSubmit = async () => {



     if(ageRanges.length === 0) {
       error && setError(true);
     } else {
       await  createPolicy(ageRanges, {
         onSuccess: () => {
           onSuccessfulSubmit();
         },
         onError: (error)=> {

         }
         ,
         onSettled: () => {
         }

       });
     }
  };

  return (
    <>
      <AddRangeForm
        onAdd={(range)=> {
          setAgeRanges([...ageRanges, range]);
        }}
      />
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Age From</th>
            <th>Age To</th>
            <th>Base Price</th>
            <th>Pax Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ageRanges.length === 0 ? (
            <tr>
              <td colSpan={5}>No Age Ranges Added</td>
            </tr>
          ) : (
            ageRanges.map((ageRange, index) => (
              <tr key={index}>
                <td>{ageRange.ageFrom}</td>
                <td>{ageRange.ageTo}</td>
                <td>{ageRange.basePrice}</td>
                <td>{ageRange.paxValue}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => setAgeRanges(ageRanges.filter((r) => r !== ageRange))} >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {
        error && <Alert variant="danger">please Add at least one Age Range.</Alert>
      }

      <Button variant="success" onClick={handleSubmit}>
        { isPending ? <Spinner/> : "Create Policy" }
      </Button>
    </>
  )
};







export default CreatePolicyForm;