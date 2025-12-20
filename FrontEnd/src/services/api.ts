/**
 * API Service Layer
 * Handles all backend communication with JWT authentication
 */

import type {
  AuthResponseDto,
  LoginDto,
  UserRegisterDto,
  LawyerRegisterDto,
  LawyerResponseDto,
  BookingDto,
  BookingResponseDto,
  PaymentDto,
  PaymentSessionResponseDto,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5128/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get auth token from localStorage
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Build request headers with auth token
   */
  private getHeaders(contentType: string = 'application/json', overrideToken?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': contentType,
    };

    const token = overrideToken || this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    overrideToken?: string
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      console.log(`Fetching ${options.method || 'GET'} ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(
          (options.headers as any)?.['Content-Type'] || 'application/json',
          overrideToken
        ),
      });

      console.log(`Response received: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`API Error Response:`, errorData);
        throw new Error(
          errorData.message || `API Error: ${response.status} ${response.statusText}`
        );
      }

      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json() as T;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // ==================== AUTH ====================

  /**
   * Register a new user
   */
  async registerUser(data: UserRegisterDto): Promise<AuthResponseDto> {
    return this.request<AuthResponseDto>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Login user
   */
  async login(data: LoginDto): Promise<AuthResponseDto> {
    return this.request<AuthResponseDto>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  // ==================== LAWYERS ====================

  /**
   * Register lawyer profile (must be authenticated)
   */
  async registerLawyer(data: LawyerRegisterDto, token?: string) {
    console.log('API Service: Calling /lawyers/register with data:', data);
    const effectiveToken = token || this.getAuthToken();
    console.log('API Service: Current auth token:', effectiveToken?.substring(0, 20) + '...');
    
    try {
      const response = await this.request('/lawyers/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }, effectiveToken);
      console.log('API Service: registerLawyer response:', response);
      return response;
    } catch (error) {
      console.error('API Service: registerLawyer failed:', error);
      throw error;
    }
  }

  /**
   * Get paginated list of lawyers
   */
  async getLawyers(page: number = 1, limit: number = 10): Promise<LawyerResponseDto[]> {
    return this.request<LawyerResponseDto[]>(
      `/lawyers?page=${page}&limit=${limit}`,
      { method: 'GET' }
    );
  }

  /**
   * Get single lawyer by ID
   */
  async getLawyer(id: number): Promise<LawyerResponseDto> {
    return this.request<LawyerResponseDto>(`/lawyers/${id}`, {
      method: 'GET',
    });
  }

  /**
   * Get current user's lawyer profile (if lawyer)
   */
  async getMyLawyerProfile() {
    return this.request('/lawyers/me', {
      method: 'GET',
    });
  }

  // ==================== BOOKINGS ====================

  /**
   * Create a new booking
   */
  async createBooking(data: BookingDto): Promise<BookingResponseDto> {
    return this.request<BookingResponseDto>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Get booking by ID
   */
  async getBooking(id: number): Promise<BookingResponseDto> {
    return this.request<BookingResponseDto>(`/bookings/${id}`, {
      method: 'GET',
    });
  }

  /**
   * Get all bookings for current user
   */
  async getUserBookings(): Promise<BookingResponseDto[]> {
    return this.request<BookingResponseDto[]>('/bookings/user', {
      method: 'GET',
    });
  }

  /**
   * Get all bookings for current user's lawyer profile
   */
  async getLawyerBookings(lawyerId?: number) {
    const url = lawyerId ? `/bookings/lawyer?lawyerId=${lawyerId}` : '/bookings/lawyer';
    return this.request(url, {
      method: 'GET',
    });
  }

  // ==================== PAYMENTS ====================

  /**
   * Create payment session (Stripe checkout)
   */
  async createPaymentSession(
    data: PaymentDto
  ): Promise<PaymentSessionResponseDto> {
    return this.request<PaymentSessionResponseDto>('/payments/session', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Export class for testing/custom instances
export default ApiService;
