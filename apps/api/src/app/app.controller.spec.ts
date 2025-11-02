import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterDto } from './dto/register.dto';

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;
  let service: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(controller.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('register', () => {
    beforeEach(() => {
      // Clear users before each test
      (service as any).users = [];
      (service as any).nextId = 1;
    });

    it('should register a new user successfully', () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const result = controller.register(registerDto);

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

      const result = controller.register(registerDto);

      expect(result.email).toBe(registerDto.email);
      expect(result.name).toBeUndefined();
    });

    it('should throw ConflictException when email already exists', () => {
      const registerDto: RegisterDto = {
        email: 'duplicate@example.com',
        password: 'password123',
      };

      controller.register(registerDto);

      expect(() => controller.register(registerDto)).toThrow(ConflictException);
    });
  });

  describe('getAllUsers', () => {
    beforeEach(() => {
      // Clear users before each test
      (service as any).users = [];
      (service as any).nextId = 1;
    });

    it('should return empty array when no users are registered', () => {
      const result = controller.getAllUsers();
      expect(result).toEqual([]);
    });

    it('should return all registered users', () => {
      controller.register({
        email: 'user1@example.com',
        password: 'pass1',
        name: 'User 1',
      });
      controller.register({
        email: 'user2@example.com',
        password: 'pass2',
      });

      const result = controller.getAllUsers();

      expect(result).toHaveLength(2);
      expect(result[0].email).toBe('user1@example.com');
      expect(result[1].email).toBe('user2@example.com');
      expect(result[0]).not.toHaveProperty('password');
      expect(result[1]).not.toHaveProperty('password');
    });
  });
});
