/**
 * Type definitions matching backend DTOs
 */

// User types
export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  role: 'User' | 'Lawyer' | 'Admin';
  createdAt: string;
}

export interface UserRegisterDto {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  role?: 'User' | 'Lawyer';
  adminSecret?: string;
}

export interface LoginDto {
  email: string;
  password: string;
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

// Auth types
export interface AuthResponseDto {
  token: string;
  user: UserResponseDto;
  expiresAt: string;
}

// Lawyer types
export interface Lawyer {
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

export interface LawyerRegisterDto {
  specialization: string;
  experienceYears: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
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

// Booking types
export interface Booking {
  id: number;
  userId: number;
  lawyerId: number;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  paymentStatus: 'Unpaid' | 'Paid' | 'Failed';
  transactionId: string;
  createdAt: string;
}

export interface BookingDto {
  lawyerId: number;
  date: string;
  userId?: number;
}

export interface BookingResponseDto {
  id: number;
  userId: number;
  lawyerId: number;
  date: string;
  status: string;
  paymentStatus: string;
  transactionId: string;
  createdAt: string;
}

// Payment types
export interface PaymentDto {
  bookingId: number;
  amount: number;
  currency: string;
}

export interface PaymentSessionResponseDto {
  sessionId: string;
  redirectUrl: string;
}
