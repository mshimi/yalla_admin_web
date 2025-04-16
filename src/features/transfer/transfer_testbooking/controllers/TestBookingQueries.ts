import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TestBookingResponseDTO } from "../types/TestBookingResponseDTO";
import { queryClient } from "../../../../main";
import { TestBookingRequestDTO } from "../types/TestBookingRequest"
import TestBookingService from "../services/TestBookingService"

class TestBookingQueries {
  private static instance: TestBookingQueries;

  public static getInstance(): TestBookingQueries {
    if (!TestBookingQueries.instance) {
      TestBookingQueries.instance = new TestBookingQueries();
    }
    return TestBookingQueries.instance;
  }

  private service = TestBookingService;

  /**
   * Mutation to perform a test booking
   */
  useTestBooking = (
    onSuccess?: (data: TestBookingResponseDTO) => void
  ): UseMutationResult<
    TestBookingResponseDTO,
    unknown,
    TestBookingRequestDTO
  > =>
    useMutation({
      mutationFn: async (dto: TestBookingRequestDTO) =>
        this.service.testBooking(dto),
      onSuccess: (data) => {
        console.log(data);
        onSuccess?.(data);
        // optionally invalidate cache
        // queryClient.invalidateQueries({ queryKey: ["some-cache-key"] });
      },
    });
}

export default TestBookingQueries.getInstance();