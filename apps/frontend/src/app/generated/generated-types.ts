// Auto-generated types from Swagger

export interface UserResponseDto {
  id: number; // Unique identifier for the user
  email: string; // User email address
  firstName: string; // User first name
  lastName: string; // User last name
  phone?: string; // User phone number
  status: 'active' | 'inactive' | 'pending' | 'suspended'; // User account status
  createdAt: string; // Timestamp when the user was created
  updatedAt: string; // Timestamp when the user was last updated
}

export interface UserListResponseDto {
  users: UserResponseDto[]; // List of users
  total: number; // Total number of users
  page: number; // Current page number
  limit: number; // Number of items per page
  totalPages: number; // Total number of pages
}

export interface CreateUserDto {
  email: string; // User email address
  firstName: string; // User first name
  lastName: string; // User last name
  phone?: string; // User phone number
}

export interface UpdateUserDto {
  firstName?: string; // User first name
  lastName?: string; // User last name
  phone?: string; // User phone number
  status?: 'active' | 'inactive' | 'pending' | 'suspended'; // User status
}

