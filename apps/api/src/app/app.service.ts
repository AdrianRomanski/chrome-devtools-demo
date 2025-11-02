import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
}

@Injectable()
export class AppService {
  private users: User[] = [];
  private nextId = 1;

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  register(registerDto: RegisterDto): { id: number; email: string; name?: string; createdAt: Date } {
    // Check if user with this email already exists
    const existingUser = this.users.find((user) => user.email === registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: this.nextId++,
      email: registerDto.email,
      password: registerDto.password, // In production, this should be hashed!
      name: registerDto.name,
      createdAt: new Date(),
    };

    this.users.push(newUser);

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  getAllUsers(): Array<{ id: number; email: string; name?: string; createdAt: Date }> {
    return this.users.map(({ password, ...user }) => user);
  }

  login(loginDto: LoginDto): { id: number; email: string; name?: string; createdAt: Date } {
    // Find user by email
    const user = this.users.find((u) => u.email === loginDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check password
    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
