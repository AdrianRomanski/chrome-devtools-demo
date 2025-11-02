import { Test } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('register', () => {
    it('should register a new user successfully', () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const result = service.register(registerDto);

      expect(result).toHaveProperty('id');
      expect(result.email).toBe(registerDto.email);
      expect(result.name).toBe(registerDto.name);
      expect(result).toHaveProperty('createdAt');
      expect(result).not.toHaveProperty('password');
    });

    it('should register a user without name', () => {
      const registerDto: RegisterDto = {
        email: 'test2@example.com',
        password: 'password123',
      };

      const result = service.register(registerDto);

      expect(result.email).toBe(registerDto.email);
      expect(result.name).toBeUndefined();
      expect(result).not.toHaveProperty('password');
    });

    it('should throw ConflictException when email already exists', () => {
      const registerDto: RegisterDto = {
        email: 'duplicate@example.com',
        password: 'password123',
      };

      service.register(registerDto);

      expect(() => service.register(registerDto)).toThrow(ConflictException);
      expect(() => service.register(registerDto)).toThrow('User with this email already exists');
    });

    it('should assign unique IDs to each user', () => {
      const user1 = service.register({
        email: 'user1@example.com',
        password: 'pass1',
      });
      const user2 = service.register({
        email: 'user2@example.com',
        password: 'pass2',
      });
      const user3 = service.register({
        email: 'user3@example.com',
        password: 'pass3',
      });

      expect(user1.id).not.toBe(user2.id);
      expect(user2.id).not.toBe(user3.id);
      expect(user3.id).toBeGreaterThan(user2.id);
    });
  });

  describe('getAllUsers', () => {
    beforeEach(() => {
      // Clear users before each test
      (service as any).users = [];
      (service as any).nextId = 1;
    });

    it('should return empty array when no users are registered', () => {
      const result = service.getAllUsers();
      expect(result).toEqual([]);
    });

    it('should return all registered users without passwords', () => {
      const user1 = service.register({
        email: 'user1@example.com',
        password: 'pass1',
        name: 'User 1',
      });
      const user2 = service.register({
        email: 'user2@example.com',
        password: 'pass2',
      });

      const result = service.getAllUsers();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: user1.id,
        email: user1.email,
        name: user1.name,
        createdAt: user1.createdAt,
      });
      expect(result[1]).toEqual({
        id: user2.id,
        email: user2.email,
        name: user2.name,
        createdAt: user2.createdAt,
      });
      expect(result[0]).not.toHaveProperty('password');
      expect(result[1]).not.toHaveProperty('password');
    });
  });

  describe('login', () => {
    beforeEach(() => {
      // Clear users before each test
      (service as any).users = [];
      (service as any).nextId = 1;
    });

    it('should login successfully with correct credentials', () => {
      // Register a user first
      const registeredUser = service.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      // Login with correct credentials
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = service.login(loginDto);

      expect(result.id).toBe(registeredUser.id);
      expect(result.email).toBe(registeredUser.email);
      expect(result.name).toBe(registeredUser.name);
      expect(result).toHaveProperty('createdAt');
      expect(result).not.toHaveProperty('password');
    });

    it('should login successfully with correct credentials without name', () => {
      // Register a user first
      const registeredUser = service.register({
        email: 'test2@example.com',
        password: 'password123',
      });

      // Login with correct credentials
      const loginDto: LoginDto = {
        email: 'test2@example.com',
        password: 'password123',
      };

      const result = service.login(loginDto);

      expect(result.id).toBe(registeredUser.id);
      expect(result.email).toBe(registeredUser.email);
      expect(result).not.toHaveProperty('password');
    });

    it('should throw UnauthorizedException when email does not exist', () => {
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      expect(() => service.login(loginDto)).toThrow(UnauthorizedException);
      expect(() => service.login(loginDto)).toThrow('Invalid email or password');
    });

    it('should throw UnauthorizedException when password is incorrect', () => {
      // Register a user first
      service.register({
        email: 'test@example.com',
        password: 'correctpassword',
      });

      // Try to login with wrong password
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      expect(() => service.login(loginDto)).toThrow(UnauthorizedException);
      expect(() => service.login(loginDto)).toThrow('Invalid email or password');
    });

    it('should return user data without password', () => {
      // Register a user first
      const registeredUser = service.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      // Login
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = service.login(loginDto);

      expect(result).not.toHaveProperty('password');
      expect(result.email).toBe(registeredUser.email);
      expect(result.id).toBe(registeredUser.id);
    });
  });
});
