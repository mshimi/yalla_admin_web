import type React from "react"
import { Button, Card, Stack } from "react-bootstrap"
import Country from "../types/Country"
import CountryImagePlaceHolder from "../../../../assets/placeholders/country_image.webp"
import {
  FaCity,
  FaImage,
  FaPencilAlt,
  FaTrashAlt,
  FaUpload,
} from "react-icons/fa"
import { useAppDispatch } from "../../../../app/hooks"
import { showEditCountryModal } from "../states/CountrySlice"
import CardActions from "./CardActions"

interface CountryCardProps {
  country: Country
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const dispatch = useAppDispatch()

  const cardImageWrapperStyle: React.CSSProperties = {
    height: "200px", // Set a fixed height for the image container
    overflow: "hidden", // Prevent overflow for large images
  }

  const cardImageStyle: React.CSSProperties = {
    height: "100%", // Fill the height of the container
    width: "100%", // Fill the width of the container
    objectFit: "cover", // Ensure the image fits and maintains aspect ratio
    objectPosition: "center", // Center the image within the container
  }

  return (
    <Card className="h-100">
      <div style={cardImageWrapperStyle}>
        <Card.Img
          style={cardImageStyle}
          title="Country_image"
          alt="Country Image"
          variant="top"
          src={
            country.imageId
              ? `/api/images/${country.imageId}`
              : CountryImagePlaceHolder
          }
        />
      </div>{" "}
      <Card.Body>
        {/* <Card.Title>{country.countryName}</Card.Title> */}

        <Stack>
          <div>
            <Card.Title>{country.countryName}</Card.Title>
            <Card.Text>{country.countryCode}</Card.Text>
          </div>
          <CardActions country={country} />
        </Stack>
      </Card.Body>
    </Card>
  )
}

export default CountryCard
