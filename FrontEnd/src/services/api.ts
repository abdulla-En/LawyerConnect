import type {
  AuthResponseDto,
  LoginDto,
  UserRegisterDto,
  LawyerRegisterDto,
  LawyerResponseDto,
  BookingDto,
  BookingResponseDto,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5128/api';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getHeaders(contentType: string = 'application/json'): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': contentType,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.title) {
            errorMessage = errorData.title;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
        } catch {
          // If JSON parsing fails, use the default error message
        }
        
        throw new Error(errorMessage);
      }

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

  async registerUser(data: UserRegisterDto): Promise<AuthResponseDto> {
    return this.request<AuthResponseDto>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    return this.request<AuthResponseDto>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  // ==================== LAWYERS ====================

  async registerLawyer(data: LawyerRegisterDto): Promise<any> {
    return this.request('/lawyers/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getLawyers(page: number = 1, limit: number = 10): Promise<LawyerResponseDto[]> {
    return this.request<LawyerResponseDto[]>(
      `/lawyers?page=${page}&limit=${limit}`,
      { method: 'GET' }
    );
  }

  async getLawyer(id: number): Promise<LawyerResponseDto> {
    return this.request<LawyerResponseDto>(`/lawyers/${id}`, {
      method: 'GET',
    });
  }

  async getMyLawyerProfile() {
    return this.request('/lawyers/me', {
      method: 'GET',
    });
  }

  // ==================== BOOKINGS ====================

  async createBooking(data: BookingDto): Promise<BookingResponseDto> {
    return this.request<BookingResponseDto>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBooking(id: number): Promise<BookingResponseDto> {
    return this.request<BookingResponseDto>(`/bookings/${id}`, {
      method: 'GET',
    });
  }

  async getUserBookings(): Promise<BookingResponseDto[]> {
    return this.request<BookingResponseDto[]>('/bookings/user', {
      method: 'GET',
    });
  }

  async getLawyerBookings(): Promise<BookingResponseDto[]> {
    return this.request<BookingResponseDto[]>('/bookings/lawyer', {
      method: 'GET',
    });
  }

  async getLawyerAppointments(): Promise<BookingResponseDto[]> {
    return this.request<BookingResponseDto[]>('/bookings/lawyer', {
      method: 'GET',
    });
  }

  async getLawyerById(id: number): Promise<LawyerResponseDto> {
    return this.request<LawyerResponseDto>(`/lawyers/${id}`, {
      method: 'GET',
    });
  }

  async updateBookingStatus(id: number, status: string): Promise<void> {
    return this.request<void>(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // ==================== USER PROFILE ====================

  async uploadProfilePhoto(photoBase64: string): Promise<{ profilePhoto: string }> {
    return this.request<{ profilePhoto: string }>('/users/upload-photo', {
      method: 'PUT',
      body: JSON.stringify({ photoBase64 }),
    });
  }

  async removeProfilePhoto(): Promise<void> {
    return this.request<void>('/users/remove-photo', {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export default ApiService;
