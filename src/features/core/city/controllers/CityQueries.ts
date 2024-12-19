import { useMutation, useQuery } from "@tanstack/react-query";
import CityService from "../service/CityService"
import { queryClient } from "../../../../main";
import { MutatuinActions } from "../../country/controllers/CountryQueries";
import City from "../types/City";
import { MutationActions, useCustomMutation } from "../../../../common/service/BaseQueries";


const cityService = new CityService();

export const CityQueries = () => {
  const useCityQueries = ({
    pageNumber,
    filters,
  }: {
    pageNumber: number;
    filters?: Record<string, string>;
  }) =>
    useQuery({
      queryKey: ["cities", pageNumber, filters],
      queryFn: async () => cityService.findAllPaginated(pageNumber, 20, filters),
    });

  const useCreateCityMutation = (actions?: MutationActions<City>) =>
    useCustomMutation<City, Partial<City>>(
      async (city) => cityService.save(city),
      {
        ...actions,
        invalidateQueryKeys: ["cities"], // Invalidate the "cities" query
      }
    );

  const useUpdateCityMutation = (actions?: MutationActions<City>) =>
    useCustomMutation<City, { id: number; city: Partial<City> }>(
      async ({ id, city }) => cityService.update(id, city),
      {
        ...actions,
        invalidateQueryKeys: ["cities"], // Invalidate the "cities" query
      }
    );

  const useUploadCityImageMutation = (actions?: MutationActions<City>) =>
    useCustomMutation<City, { id: number; file: File }>(
      async ({ id, file }) => cityService.saveImage(id, file),
      {
        ...actions,
        invalidateQueryKeys: ["cities"], // Invalidate the "cities" query
      }
    );

  const useDeleteCityImageMutation = (actions?: MutationActions<void>) =>
    useCustomMutation<void, { id: number }>(
      async ({ id }) => cityService.deleteImage(id),
      {
        ...actions,
        invalidateQueryKeys: ["cities"], // Invalidate the "cities" query
      }
    );

  const useDeleteCityMutation = (actions?: MutationActions<void>) =>
    useCustomMutation<void, number>(
      async (id) => cityService.deleteById(id),
      {
        ...actions,
        invalidateQueryKeys: ["cities"], // Invalidate the "cities" query
      }
    );

  return {
    useCityQueries,
    useCreateCityMutation,
    useUpdateCityMutation,
    useDeleteCityMutation,
    useUploadCityImageMutation,
    useDeleteCityImageMutation,
  };
};