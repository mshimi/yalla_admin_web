import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
  MutationOptions,
} from "@tanstack/react-query"
import ExcursionItemService, { AdminItemQueryParams } from "../service/ExcursionItemService"
import { ExcursionItem } from "../types/ExcursionItem"
import { ExcursionItemTranslation } from "../types/ExcursionItemTranslation"
import { ExcursionItemAdmin } from "../types/ExcursionItemAdmin"
import { PaginatedResponse } from "../../../../common/types/PaginatedResponse"

type MutationActions<TData, TVariables = void> = Omit<
  MutationOptions<TData, Error, TVariables>,
  "mutationFn"
>

class ExcursionItemQueries {
  private static instance: ExcursionItemQueries
  private service = ExcursionItemService

  public static getInstance(): ExcursionItemQueries {
    if (!ExcursionItemQueries.instance) {
      ExcursionItemQueries.instance = new ExcursionItemQueries()
    }
    return ExcursionItemQueries.instance
  }

  useGetAllItems = (
    filters: Record<string, string> = {}
  ): UseQueryResult<ExcursionItem[]> => {
    return useQuery({
      queryKey: ["excursionItems", filters],
      queryFn: () => this.service.getAllItems(filters),
    })
  }

  useGetItemsForAdmin = (): UseQueryResult<ExcursionItemAdmin[]> => {
    return useQuery({
      queryKey: ["adminExcursionItems"],
      queryFn: () => this.service.getItemsForAdmin(),
      select: (data) =>
        data.sort((a, b) => a.item.id! - b.item.id!),
    })
  }


  /**
   * Get paginated admin items
   */
  useGetItemsForAdminPaginated = (
    params: AdminItemQueryParams
  ): UseQueryResult<PaginatedResponse<ExcursionItemAdmin>> => {
    return useQuery({
      queryKey: ["adminExcursionItems", params],
      queryFn: () => this.service.getItemsForAdminPaginated(params),
      select: (data) =>{
        data.content.sort((a, b) => a.item.id!  - b.item.id!)
        return data;
      },

      placeholderData: (previousData) => previousData,
    })
  }


  useGetItem = (id: number): UseQueryResult<ExcursionItem> => {
    return useQuery({
      queryKey: ["excursionItem", id],
      queryFn: () => this.service.getItem(id),
    })
  }

  useCreateItem = (
    actions?: MutationActions<ExcursionItem, ExcursionItem>
  ): UseMutationResult<ExcursionItem, Error, ExcursionItem> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (dto) => this.service.createItem(dto),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["excursionItems"] })
        queryClient.invalidateQueries({ queryKey: ["adminExcursionItems"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useUpdateItem = (
    actions?: MutationActions<ExcursionItem, { id: number; dto: ExcursionItem }>
  ): UseMutationResult<ExcursionItem, Error, { id: number; dto: ExcursionItem }> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, dto }) => this.service.updateItem(id, dto),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["excursionItems"] })
        queryClient.invalidateQueries({ queryKey: ["adminExcursionItems"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useDeleteItem = (
    actions?: MutationActions<void, number>
  ): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (id) => this.service.deleteItem(id),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["excursionItems"] })
        queryClient.invalidateQueries({ queryKey: ["adminExcursionItems"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useDeleteTranslation = (
    actions?: MutationActions<void, { itemId: number; lang: string }>
  ): UseMutationResult<void, Error, { itemId: number; lang: string }> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ itemId, lang }) =>
        this.service.deleteTranslation(itemId, lang),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["adminExcursionItems"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useUpdateTranslations = (
    actions?: MutationActions<void, { itemId: number; translations: ExcursionItemTranslation[] }>
  ): UseMutationResult<void, Error, { itemId: number; translations: ExcursionItemTranslation[] }> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ itemId, translations }) =>
        this.service.updateTranslations(itemId, translations),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["adminExcursionItems"] })
        actions?.onSuccess?.(...args)
      },
    })
  }
}

export default ExcursionItemQueries.getInstance()
