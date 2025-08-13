import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto, UserListResponseDto } from './dto';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      status: UserStatus.ACTIVE,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      status: UserStatus.ACTIVE,
      createdAt: '2024-01-15T11:00:00Z',
      updatedAt: '2024-01-15T11:00:00Z',
    },
  ];

  private nextId = 3;

  async getUsers(page = 1, limit = 10, search?: string): Promise<UserListResponseDto> {
    let filteredUsers = this.users;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = this.users.filter(
        user =>
          user.firstName.toLowerCase().includes(searchLower) ||
          user.lastName.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers as UserResponseDto[],
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit),
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = this.users.find(user => user.email === createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const now = new Date().toISOString();
    const newUser: User = {
      id: this.nextId++,
      ...createUserDto,
      status: UserStatus.ACTIVE,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(newUser);
    return newUser as UserResponseDto;
  }

  async getUserById(id: number): Promise<UserResponseDto> {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user as UserResponseDto;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date().toISOString(),
    };

    return this.users[userIndex] as UserResponseDto;
  }

  async deleteUser(id: number): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(userIndex, 1);
  }
} 