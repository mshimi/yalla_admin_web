import { useMutation, useQuery } from "@tanstack/react-query";
import CountryService from "../service/CountryService";
import Country from "../types/Country";
import { queryClient } from "../../../../main";

import { useAppDispatch } from "../../../../app/hooks";
import { MutationActions, useCustomMutation } from "../../../../common/service/BaseQueries";

export interface MutatuinActions<T> {
  onScuccess?: (data:T) => void;
  onError?: (error:Error) => void;
  onSettled?: (data:T|undefined) => void;
  onMutate?:() => void;
}


const countryService = new CountryService();



export const CountryQueries = () => {

 const dispatch = useAppDispatch();


   const useCountryQueries = ({pageNumber, filters}: {pageNumber:number, filters? : Record<string, string>}) => useQuery(
    { 
        queryKey: ["countries", pageNumber, filters],
        queryFn: async ( ) => {
            return countryService.findAllPaginated(pageNumber, 30, filters);
        }
 });

 const useCreateCountryMutation = (actions?: MutationActions<Country>) =>
  useCustomMutation<Country, Partial<Country>>(
    async (country) => countryService.save(country),
    {
      ...actions,
      invalidateQueryKeys: ["countries"], // Invalidate the "countries" query
    }
  );

 const useUpdateCountryMutation = (actions?: MutationActions<Country>) =>
  useCustomMutation<Country, { id: number; country: Partial<Country> }>(
    async ({ id, country }) => countryService.update(id, country),
    {
      ...actions,
      invalidateQueryKeys: ["countries"], // Invalidate the "countries" query
    }
  );

const useUploadCountryImageMutation = (actions?: MutationActions<Country>) =>
  useCustomMutation<Country, { id: number; file: File }>(
    async ({ id, file }) => countryService.saveImage(id, file),
    {
      ...actions,
      invalidateQueryKeys: ["countries"], // Invalidate the "countries" query
    }
  );

const useDeleteCountryImageMutation = () => useMutation({
  mutationKey: ["deleteCountryImage"],
  mutationFn: async ( {id}:{id:number}) => {
    return countryService.deleteImage(id);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["countries"] });
  },
});

const useDeleteCountryMutation = (actions?: MutationActions<void>) =>
  useCustomMutation<void, number>(
    async (id) => countryService.deleteById(id),
    {
      ...actions,
      invalidateQueryKeys: ["countries"], // Invalidate the "countries" query
    }
  );
   
  return {
    useCountryQueries,
    useCreateCountryMutation,
    useUpdateCountryMutation,
    useDeleteCountryMutation,
    useUploadCountryImageMutation,
    useDeleteCountryImageMutation,
  };
};



