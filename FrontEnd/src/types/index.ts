// API Response Types
export interface AuthResponseDto {
  token: string;
  user: UserResponseDto;
  expiresAt: string;
}

export interface UserResponseDto {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  role: string;
  createdAt: string;
}

export interface LawyerResponseDto {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  specialization: string;
  experienceYears: number;
  price: number;
  verified: boolean;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface BookingResponseDto {
  id: number;
  userId: number;
  lawyerId: number;
  date: string;
  status: string;
  paymentStatus: string;
  transactionId?: string;
  createdAt: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  lawyerName?: string;
  lawyerSpecialization?: string;
}

// Request DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface UserRegisterDto {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  role: string;
}

export interface LawyerRegisterDto {
  specialization: string;
  experienceYears: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
}

export interface BookingDto {
  lawyerId: number;
  date: string;
  userId?: number;
}
