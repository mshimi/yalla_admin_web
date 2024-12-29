import { Form, InputGroup } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import React from "react"

const SourceAreaInput : React.FC = () => {
  return (
    <InputGroup className="mt-2">
    <Form.Control
      type="text"
  placeholder="Filter by Source"
    />
    <InputGroup.Text>
      <FaSearch />
    </InputGroup.Text>
    </InputGroup>
  );
}

export default SourceAreaInput;