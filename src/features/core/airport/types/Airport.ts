import Area from "../../area/types/Area";
import AirportPage from "../pages/AirportPage";

interface Airport {
    id: number;
    airportName: string;
    airportCode: string;
    area:Area;
}

export  default   Airport;