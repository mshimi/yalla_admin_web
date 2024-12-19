import { useState } from "react";
import { Button, Container, Form, Spinner, Stack } from "react-bootstrap";
import { CountryQueries } from "../controllers/CountryQueries";
import Country from "../types/Country";
import CountryService from "../service/CountryService";
import { useAppDispatch } from "../../../../app/hooks";
import { showAddCountryModal } from "../states/CountrySlice";


interface CountryFormProps {
    country?: Country;

}



const CreateCountryForm: React.FC<CountryFormProps> = ({ country}) => {
    const [countryName, setCountryName] = useState(country?.countryName || '');
    const [countryCode, setCountryCode] = useState(country?.countryCode || '');
    const [image, setImage] = useState<File | null>(null);
  const dispatch =  useAppDispatch();
 
   
    const uploadImage =  CountryQueries().useUploadCountryImageMutation({
        onSuccess(data) {
            closeDialog();
        },
    });
  const createCountry =  CountryQueries().useCreateCountryMutation({
    onSuccess(data) {
        if (image) {
            uploadImage.mutate({ id: data.id, file: image }); 
          } else {
            closeDialog();
          }
    },
    
  
  });

  function closeDialog(){
    dispatch(showAddCountryModal(false));
  }




    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createCountry.mutate({ countryName, countryCode });


    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <Container className="my-2">
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="countryName">
                    <Form.Label>Country Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={countryName}
                        onChange={(e) => setCountryName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="countryCode">
                    <Form.Label>Country Code</Form.Label>
                    <Form.Control
                        type="text"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="countryImage">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Form.Group>

                <Stack className="mt-5">
                <Button variant="primary" type="submit" className="ms-auto" >
                    {createCountry.isPending || uploadImage.isPending ? <Spinner animation="border" /> : <span>Save</span>}
                </Button>
                </Stack>
            </Form>
        </Container>
    );
};


export default CreateCountryForm;


