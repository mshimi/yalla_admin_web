import FormModal from "../../../../../common/modals/FormModal"
import { Button, Form, Spinner, Stack } from "react-bootstrap"
import AreaDropdownInput from "../../../../core/area/component/AreaDropdownInput"
import React, { useState } from "react"
import Area from "../../../../core/area/types/Area"
import TransferRateQueries from "../../controllers/TransferRateQueries"
import AddTransferRateRequest from "../../types/AddTransferRateRequest"
import { useAppDispatch } from "../../../../../app/hooks"
import { addNotification } from "../../../../../common/error_handlers/notificationSlice"



interface CreateNewRateModalProps {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}


const CreateNewRateModal:React.FC<CreateNewRateModalProps> = ({
  showModal,
  setShowModal
                                                              }) => {



  const [destinationArea, setDestinationArea] = useState<Area|null>(null);
  const [sourceArea, setSourceArea] = useState<Area|null>(null);
  const [ratePerPerson, setRatePerPerson] = useState<number>(1);
  const [releaseDays, setReleaseDays] = useState<number>(0);
  const [reverseRate, setReverseRate] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const {mutateAsync:addTransferRate} = TransferRateQueries.useAddTransferRate();

  const onHide = ()=> {
    reset();
    setShowModal(false);
    setIsLoading(false);
  }

  const reset = ()=> {
    setDestinationArea(null)
    setSourceArea(null)
    setRatePerPerson(1)
    setReleaseDays(0)
    setReverseRate(false)
  }

  const handleSubmit = async ()=>{
    const rates :AddTransferRateRequest[] = [];
    const rate :AddTransferRateRequest = {
      destinationAreaId:destinationArea?.id!,
      sourceAreaId:sourceArea?.id!,
      rate:ratePerPerson,
      release:releaseDays,
    }
    rates.push(rate);
    if(reverseRate && sourceArea !== null && destinationArea !== null && sourceArea.id !== destinationArea.id ){
      const reversedRate :AddTransferRateRequest = {
        sourceAreaId:destinationArea.id!,
        destinationAreaId:sourceArea.id!,
        rate:ratePerPerson,
        release:releaseDays,
      }
      rates.push(reversedRate);
    }

     await handleAddTransferRate(rates);

  }

  const dispatch = useAppDispatch();

  const handleAddTransferRate = async (rates: AddTransferRateRequest[]) => {
    setIsLoading(true);
    try {
      await Promise.all(
        rates.map((rate) =>
          addTransferRate(rate, {
            onSuccess: (data) => {
              dispatch(addNotification(
                {
                  message: "Transfer Rate Added",
                  details: ['From ${data.sourceArea.name} to ${data.destinationArea.name}'],
                  type: "success"
                }
              ));

            },

          })
        )
      );
      onHide();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (

  <FormModal
    show={showModal}
    title={"Add Transfer Rate"}
    onHide={() => {
      onHide();
    }}
  >
    <>
      <Form onSubmit={(e) => {
        if(e.currentTarget.checkValidity()){
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }
      }} >

        <Form.Group className="mb-3">
          <Form.Label>Source Area</Form.Label>
          <AreaDropdownInput
            required = {true}
            value={sourceArea}
            onChange={area => {
              if (area !== null) {
                setSourceArea(area)
              } else {
                setSourceArea(null)
              }
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Destination Area</Form.Label>
          <AreaDropdownInput
            required = {true}
            value={destinationArea}
            onChange={area => {
              if (area !== null) {
                setDestinationArea(area)
              } else {
                setDestinationArea(null)
              }
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rate Per Person</Form.Label>
          <Form.Control

            value={ratePerPerson === 0 ? "" : ratePerPerson} // Show an empty field if the value is 0
            type="text" // Use text to allow flexibility in input
            onChange={(e) => {
              const inputValue = e.target.value;

              // Allow only numeric input
              if (/^\d*$/.test(inputValue)) {
                const numericValue = Number(inputValue);

                // Set the rate, ensuring it defaults to 1 if invalid
                setRatePerPerson(numericValue >= 1 ? numericValue : 0);
              }
            }}
            onBlur={() => {
              // Enforce the minimum value on blur
              if (ratePerPerson < 1) {
                setRatePerPerson(1);
              }
            }}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Release (Days)</Form.Label>
          <Form.Control type="text" min={0} onChange={(e) => {
            const inputValue = e.target.value;

            // Allow only numbers and remove leading zeros
            const sanitizedValue = inputValue.replace(/[^0-9]/g, "").replace(/^0+(?!$)/, "");

            setReleaseDays(sanitizedValue === "" ? 0 : Number(sanitizedValue));
          }}
          value={releaseDays}
                        required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Reverse Rate"
            checked={reverseRate}
            onChange={e => {
              setReverseRate(e.target.checked)
            }}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2}>
          <Button type="submit" variant="primary">
            { isLoading ? <Spinner/> :"Save"}
          </Button>
          <Button type="reset" variant="secondary"  onClick={() => {
            reset();
          }} >
            Reset
          </Button>
        </Stack>
      </Form>
    </>
  </FormModal>
  );

}

export default CreateNewRateModal;