import TransferExtraService from "../service/TransferExtraService"
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query"
import { TransferExtra, TransferExtraTranslation } from "../types/TransferExtra "
import { queryClient } from "../../../../main"
import { Language } from "../../../../common/enums/Language"

class TransferExtrasQueries {
  private static instance: TransferExtrasQueries;

  public static getInstance(): TransferExtrasQueries {
    if (!TransferExtrasQueries.instance) {
      TransferExtrasQueries.instance = new TransferExtrasQueries();
    }
    return TransferExtrasQueries.instance;
  }

  private service = TransferExtraService;

  /**
   * Query to fetch all TransferExtras.
   */
  useFindAllTransferExtras = (): UseQueryResult<TransferExtra[]> =>
    useQuery({
      queryKey: ["transferExtras"],
      queryFn: async () => this.service.getAllTransferExtras(),
    });

  /**
   * Query to fetch a TransferExtra by ID.
   */
  useFindTransferExtraById = (id: number): UseQueryResult<TransferExtra> =>
    useQuery({
      queryKey: ["transferExtra", id],
      queryFn: async () => this.service.getTransferExtraById(id),
    });

  /**
   * Query to fetch translations for a TransferExtra by ID.
   */
  useFindTranslationsByTransferExtraId = (id: number): UseQueryResult<TransferExtraTranslation[]> =>
    useQuery({
      queryKey: ["transferExtrasTranslations", id],
      queryFn: async () => this.service.getTranslationsByTransferExtraId(id),
    });

  /**
   * Mutation to save a new TransferExtra.
   */
  useSaveTransferExtra = (): UseMutationResult<TransferExtra, unknown, Partial<TransferExtra>> =>
    useMutation({
      mutationFn: async (transferExtra: Partial<TransferExtra>) => this.service.saveTransferExtra(transferExtra),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transferExtras"] }),
    });

  /**
   * Mutation to update the pax value of a TransferExtra.
   */
  useUpdatePaxValue = (): UseMutationResult<void, unknown, { id: number; paxValue: number }> =>
    useMutation({
      mutationFn: async ({ id, paxValue }: { id: number; paxValue: number }) =>
        this.service.updatePaxValue(id, paxValue),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transferExtras"] }),
    });

  /**
   * Mutation to set a TransferExtra as not valid.
   */
  useSetAsNotValid = (): UseMutationResult<void, unknown, number> =>
    useMutation({
      mutationFn: async (id: number) => this.service.setAsNotValid(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transferExtras"] }),
    });

  /**
   * Mutation to add or update a translation for a TransferExtra.
   */
  useAddOrUpdateTranslation = (): UseMutationResult<void, unknown, { id: number; lang: Language; name: string }> =>
    useMutation({
      mutationFn: async ({ id, lang, name }: { id: number; lang: Language; name: string }) =>
        this.service.addTranslation(id, lang, name),
      onSuccess: (_, variables) =>
        queryClient.invalidateQueries({ queryKey: ["transferExtras"] }),
    });

  /**
   * Mutation to delete a translation for a TransferExtra.
   */
  useDeleteTranslation = (): UseMutationResult<void, unknown, number> =>
    useMutation({
      mutationFn: async (translationId: number) => this.service.deleteTranslation(translationId),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transferExtras"] }),
    });

  /**
   * Mutation to upload an image for a TransferExtra.
   */
  useUploadImage = (): UseMutationResult<void, unknown, { id: number; file: File }> =>
    useMutation({
      mutationFn: async ({ id, file }: { id: number; file: File }) => this.service.uploadImage(id, file),
      onSuccess: (_, variables) =>
        queryClient.invalidateQueries({ queryKey: ["transferExtras"] }),
    });

  /**
   * Mutation to delete an image for a TransferExtra.
   */
  useDeleteImage = (): UseMutationResult<void, unknown, number> =>
    useMutation({
      mutationFn: async (id: number) => this.service.deleteImage(id),
      onSuccess: (_, variables) =>
        queryClient.invalidateQueries({ queryKey: ["transferExtras"] }),
    });
}

export default TransferExtrasQueries.getInstance();