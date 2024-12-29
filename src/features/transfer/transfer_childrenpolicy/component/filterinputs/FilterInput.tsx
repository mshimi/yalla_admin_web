import { Button, Form, InputGroup } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import React from "react"
import { FaFolderClosed, FaX } from "react-icons/fa6"


interface FilterInputProps {
  onSubmit: ({key,value}:{key:string,value:string|null}) => void;
  placeholder: string;
  type: "text" | "number" | "date"
  value: string | null;
  inputKey: string;
}

const FilterInput : React.FC<FilterInputProps> = ({onSubmit, placeholder, type, value, inputKey}:FilterInputProps) => {

  const [inputValue,setInputValue] = React.useState<string>(value ?? "");


  return (
    <InputGroup className="mt-2">
      <Form.Control type={type} placeholder={placeholder}
      value={inputValue}
                    onChange={(e) => {setInputValue(e.target.value)}}
      />

        <Button className="m-0"  variant={value === inputValue ? "danger" : "secondary"} disabled={inputValue === ""}  onClick={() => {

          if(inputValue === "" ){
            onSubmit({key:inputKey,value:null});
          } else if (inputValue === value){
            setInputValue("");
            onSubmit({key:inputKey,value:null});

          }  else  {
            onSubmit({key:inputKey,value:inputValue});
          }


        }}>
          <FaSearch
            className={ value === inputValue? "d-none" : ""}
          />
          <FaX
            className={ value === inputValue? "" : "d-none"}

          />
        </Button>

    </InputGroup>
  )
}

export default FilterInput;