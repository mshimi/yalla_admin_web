import axios from "axios";
import { TestBookingResponseDTO } from "../types/TestBookingResponseDTO";
import { TestBookingRequestDTO } from "../types/TestBookingRequest"
import apiClient from "../../../../common/api/ApiClient"

const API_BASE = "/transfer/testbooking";

class TestBookingService {
  async testBooking(dto: TestBookingRequestDTO): Promise<TestBookingResponseDTO> {
    const response = await apiClient.post(API_BASE, dto);
    console.log(response);
    return response.data;
  }
}

export default new TestBookingService();
