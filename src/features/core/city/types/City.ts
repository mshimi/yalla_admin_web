import Country from "../../country/types/Country";

export default interface City {

    id:number;
    cityName: string;
    cityCode:string;
    country:Country;
    imageId:number;

}