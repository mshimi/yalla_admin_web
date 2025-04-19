import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
  MutationFunction,
  MutationOptions,
} from "@tanstack/react-query"
import CategoryService from "../service/CategoryService"
import { Category } from "../types/Category"
import { CategoryTranslation } from "../types/CategoryTranslation"
import { CategoryAdmin } from "../types/CategoryAdmin"

type MutationActions<TData, TVariables = void> = Omit<
  MutationOptions<TData, Error, TVariables>,
  "mutationFn"
>

class CategoryQueries {
  private static instance: CategoryQueries
  private service = CategoryService

  public static getInstance(): CategoryQueries {
    if (!CategoryQueries.instance) {
      CategoryQueries.instance = new CategoryQueries()
    }
    return CategoryQueries.instance
  }

  useGetAllCategories = (
    filters: Record<string, string> = {}
  ): UseQueryResult<Category[]> => {
    return useQuery({
      queryKey: ["categories", filters],
      queryFn: () => this.service.getAllCategories(filters),
    })
  }

  useGetCategoriesForAdmin = (): UseQueryResult<CategoryAdmin[]> => {
    return useQuery({
      queryKey: ["adminCategories"],
      queryFn: () => this.service.getCategoriesForAdmin(),
      select:(data) =>{
        return data.sort((a, b) => a.category.id! - b.category.id!)
    }
    })
  }

  useGetCategory = (id: number): UseQueryResult<Category> => {
    return useQuery({
      queryKey: ["category", id],
      queryFn: () => this.service.getCategory(id),
    })
  }

  useCreateCategory = (
    actions?: MutationActions<Category, Category>
  ): UseMutationResult<Category, Error, Category> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (dto) => this.service.createCategory(dto),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["categories"] })
        queryClient.invalidateQueries({ queryKey: ["adminCategories"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useUpdateCategory = (
    actions?: MutationActions<Category, { id: number; dto: Category }>
  ): UseMutationResult<Category, Error, { id: number; dto: Category }> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, dto }) => this.service.updateCategory(id, dto),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["categories"] })
        queryClient.invalidateQueries({ queryKey: ["adminCategories"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useDeleteCategory = (
    actions?: MutationActions<void, number>
  ): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (id) => this.service.deleteCategory(id),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["categories"] })
        queryClient.invalidateQueries({ queryKey: ["adminCategories"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useUploadImage = (
    actions?: MutationActions<Category, { id: number; file: File }>
  ): UseMutationResult<Category, Error, { id: number; file: File }> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, file }) => this.service.uploadImage(id, file),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["categories"] })
        queryClient.invalidateQueries({ queryKey: ["adminCategories"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useDeleteImage = (
    actions?: MutationActions<void, number>
  ): UseMutationResult<void, Error, number> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (id) => this.service.deleteImage(id),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["categories"] })
        queryClient.invalidateQueries({ queryKey: ["adminCategories"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useDeleteTranslation = (
    actions?: MutationActions<void, { categoryId: number; lang: string }>
  ): UseMutationResult<void, Error, { categoryId: number; lang: string }> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ categoryId, lang }) =>
        this.service.deleteTranslation(categoryId, lang),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["adminCategories"] })
        actions?.onSuccess?.(...args)
      },
    })
  }

  useUpdateTranslations = (
    actions?: MutationActions<void, { categoryId: number; translations: CategoryTranslation[] }>
  ): UseMutationResult<void, Error, { categoryId: number; translations: CategoryTranslation[] }> => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ categoryId, translations }) =>
        this.service.updateTranslations(categoryId, translations),
      ...actions,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["adminCategories"] })
        actions?.onSuccess?.(...args)
      },
    })
  }
}

export default CategoryQueries.getInstance()
