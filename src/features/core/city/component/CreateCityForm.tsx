import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import CountryDropdownInput from "../../country/component/CountryDropdownInput"; // Reuse the CountryDropdownInput
import { useAppDispatch } from "../../../../app/hooks";
import { addNotification } from "../../../../common/error_handlers/notificationSlice";
import Country from "../../country/types/Country";
import { CityQueries } from "../controllers/CityQueries";
interface CreateCityFormProps {
    onSubmit: (city: { cityName: string; cityCode: string; country: Country }) => void;
    isLoading?: boolean;
  }
  
  const CreateCityForm: React.FC = () => {
    const [cityName, setCityName] = useState<string>("");
    const [cityCode, setCityCode] = useState<string>("");
    const [country, setCountry] = useState<Country | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const dispatch = useAppDispatch();  

    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
      if (!cityName.trim()) newErrors.cityName = "City Name is required.";
      if (!cityCode.trim()) newErrors.cityCode = "City Code is required.";
      if (!country) newErrors.country = "Country is required.";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (validateForm()) {
        onSubmit({ cityName, cityCode, country: country! });
      }
    };

    const cityQueries = CityQueries();
    const { useCreateCityMutation } = cityQueries;
    const createCityMutation = useCreateCityMutation({
      onSuccess: () => {
        dispatch(addNotification({ type: "success", message: "City created successfully" }));
        setCityName("");
        setCityCode("");
        setCountry(null);
      },
      onError: () => {
        dispatch(addNotification({ type: "error", message: "Failed to create city" }));
      },
    });

    function onSubmit(city: { cityName: string; cityCode: string; country: Country }) {
        createCityMutation.mutate(city);
    }

  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="cityName">
          <Form.Label>City Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            isInvalid={!!errors.cityName}
          />
          <Form.Control.Feedback type="invalid">{errors.cityName}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="cityCode">
          <Form.Label>City Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city code"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
            isInvalid={!!errors.cityCode}
          />
          <Form.Control.Feedback type="invalid">{errors.cityCode}</Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <CountryDropdownInput
            value={country}
            onChange={(value) => {
              setCountry(value);
              setErrors((prev) => ({ ...prev, country: "" })); // Clear error when valid country selected
            }}
            
          />
          {!!errors.country && <div className="text-danger">{errors.country}</div>}
        </Form.Group>
  
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary" disabled={createCityMutation.isPending}>
            {createCityMutation.isPending ? "Saving..." : "Save City"}
          </Button>
        </div>
      </Form>
    );
  };
  
  export default CreateCityForm;