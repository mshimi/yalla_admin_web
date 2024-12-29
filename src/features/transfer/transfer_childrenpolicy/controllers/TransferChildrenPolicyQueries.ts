import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import TransferChildrenPolicyService from "../service/TransferChildrenPolicyService";
import { AgeRange } from "../types/AgeRange";
import { TransferChildrenPolicy } from "../types/TransferChildrenPolicy";
import { queryClient } from "../../../../main";

class TransferChildrenPolicyQueries {
  private static instance: TransferChildrenPolicyQueries;

  public static getInstance(): TransferChildrenPolicyQueries {
    if (!TransferChildrenPolicyQueries.instance) {
      TransferChildrenPolicyQueries.instance = new TransferChildrenPolicyQueries();
    }
    return TransferChildrenPolicyQueries.instance;
  }

  private service = TransferChildrenPolicyService;

  /**
   * Query to fetch the active TransferChildrenPolicy.
   */
  useGetActivePolicy = (): UseQueryResult<TransferChildrenPolicy | string> =>
    useQuery({
      queryKey: ["activePolicy"],
        queryFn: async () => this.service.getActivePolicy(),
      select: (data: TransferChildrenPolicy | string) =>{
        if(typeof data === 'object' && 'id' in data && 'ageRanges' in data) {
          data.ageRanges.sort((a: { ageFrom: number }, b: { ageFrom: number }) => a.ageFrom - b.ageFrom);


          return data;
        } else {
          return "Keine aktive Policy vorhanden.";

        }
      }
    });

  /**
   * Mutation to set a specific TransferChildrenPolicy as inactive.
   * @returns A mutation hook for marking a policy as inactive.
   */
  useSetPolicyAsInactive = (): UseMutationResult<void, unknown, number> =>
    useMutation({
      mutationFn: async (id: number) => this.service.setPolicyAsInactive(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["activePolicy"] }),
    });

  /**
   * Mutation to add a new AgeRange to the active policy.
   * @returns A mutation hook for adding a new AgeRange.
   */
  useAddAgeRangeToExistingPolicy = (): UseMutationResult<
    TransferChildrenPolicy,
    unknown,
    AgeRange
  > =>
    useMutation({
      mutationFn: async (ageRange: AgeRange) =>
        this.service.addAgeRangeToExistingPolicy(ageRange),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["activePolicy"] }),
    });

  /**
   * Mutation to create a new TransferChildrenPolicy with a list of AgeRanges.
   * @returns A mutation hook for creating a new policy with AgeRanges.
   */
  useCreateNewPolicyWithAgeRanges = (
    onSuccessCallback?: (data: TransferChildrenPolicy) => void
  ): UseMutationResult<TransferChildrenPolicy, unknown, AgeRange[]> =>
    useMutation({
      mutationFn: async (ageRanges: AgeRange[]) =>
        this.service.createNewPolicyWithAgeRanges(ageRanges),
      onSuccess: (data) => {
        onSuccessCallback?.(data);
        queryClient.invalidateQueries({ queryKey: ["activePolicy"] });
      },
    });
}

export default TransferChildrenPolicyQueries.getInstance();