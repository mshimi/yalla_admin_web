import { useQuery, useMutation, UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { MutationActions, useCustomMutation } from "../../common/service/BaseQueries";
import { BaseService } from "./BaseService";
import { BaseServiceWithImage } from "./BaseServiceWithImage";

export abstract class QueryGenerator<T, ID> {
    protected readonly service: BaseService<T, ID> | BaseServiceWithImage<T, ID>;
    protected readonly entityName: string;
  
    constructor(service: BaseService<T, ID> | BaseServiceWithImage<T, ID>, entityName: string) {
      this.service = service;
      this.entityName = entityName;
    }
  
    useFindAll = (filters?: Record<string, string>): UseQueryResult<T[]> =>
      useQuery({
        queryKey: [this.entityName, "all", filters],
        queryFn: async () => this.service.findAll(filters),
      });
  
    useFindAllPaginated = ({
      pageNumber,
      pageSize,
      filters,
    }: {
      pageNumber: number;
      pageSize: number;
      filters?: Record<string, string>;
    }): UseQueryResult<any> =>
      useQuery({
        queryKey: [this.entityName, "paginated", pageNumber, filters],
        queryFn: async () => this.service.findAllPaginated(pageNumber, pageSize, filters),
      });
  
    useFindById = (id: ID): UseQueryResult<T> =>
      useQuery({
        queryKey: [this.entityName, id],
        queryFn: async () => this.service.findById(id),
      });
  
    useCreate = (actions?: MutationActions<T>): UseMutationResult<T, Error, Partial<T>> =>
      useCustomMutation<T, Partial<T>>(
              async (entity) => this.service.save(entity),
              {
                ...actions,
                invalidateQueryKeys: [this.entityName],
              }
            );
  
    useUpdate = (actions?: MutationActions<T>): UseMutationResult<T, Error, { id: ID; entity: Partial<T> }> =>
      useCustomMutation<T, { id: ID; entity: Partial<T> }>(
        async ({ id, entity }) => this.service.update(id, entity),
        {
          ...actions,
          invalidateQueryKeys: [this.entityName],
        }
      );

    useDelete = (actions?: MutationActions<void>): UseMutationResult<void, Error, ID> =>
      useCustomMutation<void, ID>(
        async (id) => this.service.deleteById(id),
        {
          ...actions,
          invalidateQueryKeys: [this.entityName],
        }
      );

    useUploadImage = (actions?: MutationActions<T>): UseMutationResult<T, Error, { id: ID; file: File }> => {
      if (!(this.service instanceof BaseServiceWithImage)) {
        throw new Error("Service does not support image upload.");
      }
      return useCustomMutation<T, { id: ID; file: File }>(
        async ({ id, file }) => (this.service as BaseServiceWithImage<T, ID>).saveImage(id, file),
        {
          ...actions,
          invalidateQueryKeys: [this.entityName],
        }
      );
    };

    useDeleteImage = (actions?: MutationActions<void>): UseMutationResult<void, Error, ID> => {
      if (!(this.service instanceof BaseServiceWithImage)) {
        throw new Error("Service does not support image deletion.");
      }
      return useCustomMutation<void, ID>(
        async (id) => (this.service as BaseServiceWithImage<T, ID>).deleteImage(id),
        {
          ...actions,
          invalidateQueryKeys: [this.entityName],
        }
      );
    };
  }