import City from "../../city/types/City"

export default interface Area {
  id: number
  areaName: string
  city: City
  imageId: number | null
}
