import React from "react";
import { Card, Stack } from "react-bootstrap";
import City from "../types/City";
import CardActions from "../../country/component/CardActions";
import CityImagePlaceholder from "../../../../assets/placeholders/country_image.webp";
import CityCardActions from "./CityCardActions";

interface CityCardProps {
    city: City;
  }
  
  const CityCard: React.FC<CityCardProps> = ({ city }) => {
    const cardImageWrapperStyle: React.CSSProperties = {
      height: "200px", // Set a fixed height for the image container
      overflow: "hidden", // Prevent overflow for large images
    };
  
    const cardImageStyle: React.CSSProperties = {
      height: "100%", // Fill the height of the container
      width: "100%", // Fill the width of the container
      objectFit: "cover", // Ensure the image fits and maintains aspect ratio
      objectPosition: "center", // Center the image within the container
    };
  
    return (
      <Card className="h-100">
        <div style={cardImageWrapperStyle}>
          <Card.Img
            style={cardImageStyle}
            title="City_image"
            alt="City Image"
            variant="top"
            src={city.imageId ? `/api/images/${city.imageId}` : CityImagePlaceholder}
          />
        </div>
        <Card.Body>
          <Stack>
            <div>
              <Card.Title>{city.cityName}</Card.Title>
              <Card.Text>
                <div>
                {city.cityCode}
                </div>
                <div>
                {city.country.countryName + ", " + city.country.countryCode }
                </div>
              </Card.Text>
            </div>
          <CityCardActions city={city}/>
          </Stack>
        </Card.Body>
      </Card>
    );
  };
  
  export default CityCard;