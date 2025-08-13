import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Импорты будут автоматически сгенерированы из Swagger
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="users-container">
      <h2>User Management</h2>
      
      <!-- Create User Form -->
      <div class="create-user-form">
        <h3>Create New User</h3>
        <form (ngSubmit)="createUser()" #userForm="ngForm">
          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="newUser.email" 
              required
              class="form-control">
          </div>
          
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              [(ngModel)]="newUser.firstName" 
              required
              class="form-control">
          </div>
          
          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              [(ngModel)]="newUser.lastName" 
              required
              class="form-control">
          </div>
          
          <div class="form-group">
            <label for="phone">Phone (optional):</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              [(ngModel)]="newUser.phone"
              class="form-control">
          </div>
          
          <button type="submit" [disabled]="!userForm.form.valid" class="btn btn-primary">
            Create User
          </button>
        </form>
      </div>
      
      <!-- Users List -->
      <div class="users-list">
        <h3>Users List</h3>
        <button (click)="loadUsers()" class="btn btn-secondary">Refresh</button>
        
        <div class="users-grid" *ngIf="users.length > 0">
          <div class="user-card" *ngFor="let user of users">
            <h4>{{ user.firstName }} {{ user.lastName }}</h4>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p *ngIf="user.phone"><strong>Phone:</strong> {{ user.phone }}</p>
            <div class="user-actions">
              <button (click)="editUser(user)" class="btn btn-sm btn-outline">Edit</button>
              <button (click)="deleteUser(user.id)" class="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        </div>
        
        <div *ngIf="users.length === 0" class="no-users">
          <p>No users found. Create your first user above!</p>
        </div>
      </div>
      
      <!-- Status Messages -->
      <div class="status-messages">
        <div *ngIf="loading" class="alert alert-info">Loading...</div>
        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
        <div *ngIf="success" class="alert alert-success">{{ success }}</div>
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .create-user-form {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }
    
    .form-control {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-right: 10px;
    }
    
    .btn-primary {
      background: #007bff;
      color: white;
    }
    
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
    
    .btn-danger {
      background: #dc3545;
      color: white;
    }
    
    .btn-outline {
      background: transparent;
      border: 1px solid #007bff;
      color: #007bff;
    }
    
    .btn-sm {
      padding: 4px 8px;
      font-size: 12px;
    }
    
    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    
    .user-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .user-card h4 {
      margin: 0 0 10px 0;
      color: #333;
    }
    
    .user-card p {
      margin: 5px 0;
      color: #666;
    }
    
    .user-actions {
      margin-top: 15px;
      display: flex;
      gap: 10px;
    }
    
    .alert {
      padding: 12px;
      border-radius: 4px;
      margin: 10px 0;
    }
    
    .alert-info {
      background: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }
    
    .alert-danger {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    
    .alert-success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    
    .no-users {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  newUser: CreateUserRequest = {
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  };
  
  loading = false;
  error = '';
  success = '';

  constructor() {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';
    
    // Здесь будет использоваться сгенерированный сервис
    // UsersService.getUsers().subscribe(...)
    
    // Временная заглушка для демонстрации
    setTimeout(() => {
      this.users = [
        {
          id: 1,
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890'
        },
        {
          id: 2,
          email: 'jane.smith@example.com',
          firstName: 'Jane',
          lastName: 'Smith'
        }
      ];
      this.loading = false;
    }, 1000);
  }

  createUser() {
    this.loading = true;
    this.error = '';
    this.success = '';
    
    // Здесь будет использоваться сгенерированный сервис
    // UsersService.createUser(this.newUser).subscribe(...)
    
    // Временная заглушка для демонстрации
    setTimeout(() => {
      const newUser: User = {
        id: this.users.length + 1,
        ...this.newUser
      };
      
      this.users.push(newUser);
      this.newUser = { email: '', firstName: '', lastName: '', phone: '' };
      this.success = 'User created successfully!';
      this.loading = false;
    }, 1000);
  }

  editUser(user: User) {
    // Реализация редактирования
    console.log('Edit user:', user);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.loading = true;
      this.error = '';
      
      // Здесь будет использоваться сгенерированный сервис
      // UsersService.deleteUser(userId).subscribe(...)
      
      // Временная заглушка для демонстрации
      setTimeout(() => {
        this.users = this.users.filter(user => user.id !== userId);
        this.success = 'User deleted successfully!';
        this.loading = false;
      }, 1000);
    }
  }
} 