import { useQuery, UseQueryResult } from "@tanstack/react-query";
import ReleaseService from "../service/ReleaseService";

class ReleaseQueries {
  
private static instance: ReleaseQueries;

public static getInstance(): ReleaseQueries{
  if(!ReleaseQueries.instance){
    ReleaseQueries.instance = new ReleaseQueries();
  }
  return ReleaseQueries.instance;
}

private service =  ReleaseService;


useFindAll = (filters?: Record<string, string>): UseQueryResult<GeneralTransferRelease|null> =>
    useQuery({
      queryKey: ["generalRelease"],
      queryFn: async () => this.service.getGeneralRelease(),
    });




}

export default ReleaseQueries.getInstance();