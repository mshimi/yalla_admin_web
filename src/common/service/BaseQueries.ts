import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { queryClient } from "../../main";


export interface MutationActions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    onSettled?: (data?: T, error?: Error) => void;
    onMutate?: () => void;
    invalidateQueryKeys?: string[]; // Add query keys to invalidate
  }

export const useCustomMutation = <T, Variables>(
    mutationFn: (variables: Variables) => Promise<T>,
    options?: MutationActions<T>
  ): UseMutationResult<T, Error, Variables> => {
    return useMutation({
      mutationFn,
      onMutate: async (variables) => {
        options?.onMutate?.();
      },
      onSuccess: (data, variables, context) => {
        options?.onSuccess?.(data);
  
        // Invalidate only specified query keys
        if (options?.invalidateQueryKeys) {
          options.invalidateQueryKeys.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: [key] });
          });
        }
      },
      onError: (error, variables, context) => {
        options?.onError?.(error);
      },
      onSettled: (data, error, variables, context) => {
        options?.onSettled?.(data, error ?? undefined);
      },
    });
  };