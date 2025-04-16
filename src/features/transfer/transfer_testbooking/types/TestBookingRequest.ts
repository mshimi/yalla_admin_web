export interface TestBookingRequestDTO {
  /**
   * ID of the start area (required, must be positive)
   */
  startAreaId: number;

  /**
   * ID of the end area (required, must be positive)
   */
  endAreaId: number;

  /**
   * Number of adults (required, minimum 1)
   */
  adults: number;

  /**
   * List of children’s ages (each must be between 0 and 17)
   */
  child?: number[]; // Optional, defaults to empty if not set

  /**
   * Travel start date (must be in the future)
   */
  startDate: string; // ISO 8601 date string (e.g., "2025-05-01")

  /**
   * Extras map: key = quantity (min 1), value = extra ID (positive number)
   */
  extras?: Record<number, number>; // Optional map of quantity → extraId
}