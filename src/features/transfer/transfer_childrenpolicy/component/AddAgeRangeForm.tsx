import React, { useState } from "react"
import { Alert, Button, Col, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { AgeRange } from "../types/AgeRange"


interface AddRangeFormProps {
  onAdd:(ageRange:AgeRange)=>void;
}

const AddRangeForm :React.FC<AddRangeFormProps>= ({onAdd})=> {

  const [ageFrom,setAgeFrom] = useState<number>(0.0)
  const [ageTo,setAgeTo] = useState<number>(0.0)
  const [basePrice,setBasePrice] = useState<number>(0.0)
  const [paxValue,setPaxValue] = useState<number>(0.0)

  const [errors, setErrors] = useState<string[]>([]);

  const handleOnAdd =() =>{
    resetError();
    const ageRange : AgeRange = {ageFrom,ageTo,basePrice,paxValue};

    const validationResult = validateAddRange(ageRange);
    if(validationResult.isValid){
      onAdd(ageRange);
    } else {
      setErrors(validationResult.errors);
    }

  }

  const resetError = ()=> {
    if(errors.length>0){
      setErrors([]);
    }
  }

  return (
    <Form>
      {/* First Row: Age From and Age To */}
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Group>
            <Form.Label>Age From</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age From"
              value={ageFrom}
              onChange={(e) =>
              {
                e.target.value === "" ? setAgeFrom(0) : setAgeFrom(Number(e.target.value))
              }
              }
            />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <Form.Label>Age To</Form.Label>
            <Form.Control
              type="number"
              placeholder="Age To"
              value={ageTo}
              onChange={(e) =>
              {
                e.target.value === "" ? setAgeTo(0) : setAgeTo(Number(e.target.value))
              }
              }
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Second Row: Pax Value, Base Price, and Add Button */}
      <Row className="mb-3 align-items-end">
        <Col xs={5}>
          <Form.Group>
            <Form.Label>Pax Value</Form.Label>
            <Form.Control
              type="number"
              placeholder="Pax Value"
              value={paxValue}
              step="0.25"
              min="0"
              max="1"
              onChange={(e) =>
              {
                e.target.value === "" ? setPaxValue(0) : setPaxValue(Number(e.target.value))
              }
              }
            />
          </Form.Group>
        </Col>
        <Col xs={5}>
          <Form.Group>
            <Form.Label>Base Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Base Price"
              value={basePrice}
              step="0.25"
              min="0"
              max="1"
              onChange={(e) =>
              {
                const value = e.target.value;
                // Remove leading zeros and convert to number
                const sanitizedValue = value ? parseFloat(value) : 0;
                setBasePrice(sanitizedValue > 1 ? 1 : sanitizedValue < 0 ? 0 : sanitizedValue); // Ensure within range
              }                }
            />
          </Form.Group>
        </Col>
        <Col xs={2}>
          <Button variant="primary" onClick={handleOnAdd} className="w-100">
            Add
          </Button>
        </Col>
      </Row>

      {errors.length > 0 && (
        <Alert variant="danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}><span style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "100%"
              }} >{error}</span></li>
            ))}
          </ul>
        </Alert>
      )}

    </Form>
  );
}



function validateAddRange(ageRange: AgeRange): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate that ageFrom is smaller than or equal to ageTo
  if (ageRange.ageFrom > ageRange.ageTo) {
    errors.push("Age From must be smaller than or equal to Age To.");
  }

  // Allowed values for paxValue and basePrice
  const allowedValues = [0.0, 0.25, 0.5, 0.75 ,1.0];

  // Validate paxValue
  if (!allowedValues.includes(ageRange.paxValue)) {
    errors.push(
      `Invalid Pax Value.`
    );
  }

  // Validate basePrice
  if (!allowedValues.includes(ageRange.basePrice)) {
    errors.push(
      `Invalid Base Price.`
    );
  }

  // Return validation result
  return {
    isValid: errors.length === 0,
    errors,
  };
}


export default AddRangeForm;