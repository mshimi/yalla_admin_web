import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query"
import ReleaseService from "../service/ReleaseService";
import { GeneralTransferRelease } from "../types/GeneralTransferRelease"
import { queryClient } from "../../../../main"
class ReleaseQueries {
  private static instance: ReleaseQueries;

  public static getInstance(): ReleaseQueries {
    if (!ReleaseQueries.instance) {
      ReleaseQueries.instance = new ReleaseQueries();
    }
    return ReleaseQueries.instance;
  }

  private service = ReleaseService;

  /**
   * Query to fetch the general release period.
   */
  useFindGeneralRelease = (): UseQueryResult<GeneralTransferRelease | null> =>
    useQuery({
      queryKey: ["generalRelease"],
      queryFn: async () => this.service.getGeneralRelease(),
    });

  /**
   * Query to fetch all active release periods.
   */
  useFindAllReleases = (): UseQueryResult<TransferRelease[]> =>
    useQuery({
      queryKey: ["allReleases"],
      queryFn: async () => this.service.getRelease(),
      select: (data: TransferRelease[]) =>
        data.sort((a, b) => {
          const dateA = a.startDate ? new Date(a.startDate).getTime() : 0; // Handle null or undefined
          const dateB = b.startDate ? new Date(b.startDate).getTime() : 0; // Handle null or undefined
          return dateA - dateB; // Ascending order
        }),
    });

  /**
   * Mutation to set a release as inactive.
   * @returns A mutation hook for marking a release as inactive.
   */
  useSetReleaseInactive = (): UseMutationResult<void, unknown, number> =>
    useMutation({
      mutationFn: async (id: number) => this.service.setReleaseInactive(id) ,
      onSuccess: ()=>queryClient.invalidateQueries({ queryKey: ["allReleases"] })

    });

  /**
   * Mutation to add a new general release period.
   * @returns A mutation hook for adding a general release period.
   */
  useAddGeneralRelease = (onsuccess?: (data:GeneralTransferRelease)=> void ): UseMutationResult<GeneralTransferRelease, unknown, Partial< GeneralTransferRelease>> =>
    useMutation({
      mutationFn: async (releasePeriodDTO: Partial< GeneralTransferRelease>) =>
        this.service.addGeneralReleasePeriod(releasePeriodDTO),
      onSuccess: (data, variables, context)=> {
        onsuccess?.(data);
        queryClient.invalidateQueries({ queryKey: ["generalRelease"] });
       }
    });

  /**
   * Mutation to add a new specific release period.
   * @returns A mutation hook for adding a specific release period.
   */
  useAddReleasePeriod = (): UseMutationResult< TransferRelease, unknown,  Partial<TransferRelease>> =>
    useMutation({
      mutationFn: async (releasePeriodDTO:  Partial<TransferRelease>) =>
        this.service.addReleasePeriod(releasePeriodDTO),
      onSuccess: ()=>queryClient.invalidateQueries({ queryKey: ["allReleases"] })
    },
      );


    useBacktoGeneralRelease = (): UseMutationResult< TransferRelease[], unknown,  {startDate:string, endDate:string}> =>
    useMutation({
      mutationFn: async ({startDate, endDate }: {startDate:string, endDate:string}) =>
        this.service.backToGeneralRelease({startDate, endDate }),
      onSuccess: ()=>queryClient.invalidateQueries({ queryKey: ["allReleases"] })

    })

}

export default ReleaseQueries.getInstance();