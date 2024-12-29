import TransferRateService from "../service/TransferRateService"
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query"
import { PaginatedResponse } from "../../../../common/types/PaginatedResponse"
import TransferRate from "../types/TransferRate"
import AddTransferRateRequest from "../types/AddTransferRateRequest"
import { queryClient } from "../../../../main"
import TransferRateFilters, { filtersToRecord } from "../types/TransferRateFilters"


class TransferRateQueries {
  private static instance: TransferRateQueries;

  private service = TransferRateService;

  public static getInstance(): TransferRateQueries {
    if (!TransferRateQueries.instance) {
      TransferRateQueries.instance = new TransferRateQueries();
    }
    return TransferRateQueries.instance;
  }

  /**
   * Query to fetch all active TransferRates with pagination and filters.
   * @param page Current page number (default: 0).
   * @param size Number of items per page (default: 30).
   * @param filters Additional filters to apply.
   */
  useGetActiveTransferRates = (
    page: number = 0,
    size: number = 30,
    filters: TransferRateFilters
  ): UseQueryResult<PaginatedResponse<TransferRate>> => {

    const filtersRecord: Record<string, string> = filtersToRecord(filters);

    return useQuery({
      queryKey: ["activeTransferRates", page, size, filtersRecord],
      queryFn: async () =>
        this.service.getActiveTransferRates(page, size, filtersRecord),
      select: data => {
        // Ensure data and data.content are not null or undefined
        if (!data || !data.content) {
          return data; // Return data as-is if it's null or undefined
        }

        const sortField = (filtersRecord.sort as keyof TransferRate) || "id"; // Default to 'id' if sortField is undefined or invalid

        return {
          ...data,
          content: [...data.content].sort((a, b) => {
            const valueA = a[sortField];
            const valueB = b[sortField];

            // Null or undefined checks for properties
            if (valueA == null && valueB == null) return 0;
            if (valueA == null) return 1; // Null values are considered "greater" to push them to the end
            if (valueB == null) return -1;

            // Ensure values are comparable
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
          }),
        };
      },
    });
  }


  /**
   * Mutation to add a new TransferRate.
   * @returns A mutation hook for adding a TransferRate.
   */
  useAddTransferRate = (): UseMutationResult<TransferRate, unknown, AddTransferRateRequest> =>
    useMutation({
      mutationFn: async (dto: AddTransferRateRequest) => this.service.addTransferRate(dto),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["activeTransferRates"] }),
    });

  /**
   * Mutation to add multiple TransferRates in bulk.
   * @returns A mutation hook for adding multiple TransferRates.
   */
  useAddTransferRates = (): UseMutationResult<TransferRate[], unknown, TransferRate[]> =>
    useMutation({
      mutationFn: async (rates: TransferRate[]) => this.service.addTransferRates(rates),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["activeTransferRates"] }),
    });

  /**
   * Mutation to add multiple TransferRates using DTOs.
   * @returns A mutation hook for adding multiple TransferRates using DTOs.
   */
  useAddTransferRatesFromDTO = (): UseMutationResult<TransferRate[], unknown, AddTransferRateRequest[]> =>
    useMutation({
      mutationFn: async (dto: AddTransferRateRequest[]) => this.service.addTransferRatesFromDTO(dto),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["activeTransferRates"] }),
    });

  /**
   * Query to fetch a specific TransferRate for given source and destination areas.
   * @param sourceAreaId ID of the source area.
   * @param destinationAreaId ID of the destination area.
   */
  useGetTransferRateForAreas = (
    sourceAreaId: number,
    destinationAreaId: number
  ): UseQueryResult<TransferRate> =>
    useQuery({
      queryKey: ["transferRateForAreas", sourceAreaId, destinationAreaId],
      queryFn: async () => this.service.getTransferRateForAreas(sourceAreaId, destinationAreaId),
    });

  /**
   * Mutation to deactivate a specific TransferRate.
   * @returns A mutation hook for deactivating a TransferRate.
   */
  useSetTransferRateInactive = (): UseMutationResult<void, unknown, number> =>
    useMutation({
      mutationFn: async (id: number) => this.service.setTransferRateInactive(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["activeTransferRates"] }),
    });

  /**
   * Mutation to Reactivate a specific TransferRate.
   * @returns A mutation hook for deactivating a TransferRate.
   */
  useSetTransferRateActive = (): UseMutationResult<TransferRate, unknown, number> =>
    useMutation({
      mutationFn: async (id: number)  => this.service.reactiveTransferRate(id),
      onSuccess: (data, variables, context) => queryClient.invalidateQueries({ queryKey: ["activeTransferRates"] }),
    });
}

export default TransferRateQueries.getInstance();