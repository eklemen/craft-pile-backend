import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../db/models/User.model';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  // describe('validateUser', () => {
  //   it('should return null if user is not found', async () => {
  //     jest.spyOn(userService, 'getUser').mockResolvedValue(null);
  //     const result = await authService.validateUser(
  //       'test@example.com',
  //       'password',
  //     );
  //     expect(result).toBeNull();
  //   });
  //
  //   it('should throw UnauthorizedException if password is invalid', async () => {
  //     const user: User = {
  //       email: 'test@example.com',
  //       password: 'password',
  //     };
  //     jest.spyOn(userService, 'getUser').mockResolvedValue(user);
  //     jest.spyOn(bcrypt, 'compare').mockResolvedValue();
  //
  //     await expect(
  //       authService.validateUser('test@example.com', 'invalid-password'),
  //     ).rejects.toThrow(UnauthorizedException);
  //   });
  //
  //   it('should return the user if email and password are valid', async () => {
  //     const user = {
  //       email: 'test@example.com',
  //       password: 'password',
  //     };
  //     jest.spyOn(userService, 'getUser').mockResolvedValue(user);
  //     jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  //
  //     const result = await authService.validateUser(
  //       'test@example.com',
  //       'password',
  //     );
  //     expect(result).toEqual(user);
  //   });
  // });
  //
  // describe('register', () => {
  //   it('should create a new user and return an auth token', async () => {
  //     const user = {
  //       email: 'test@example.com',
  //       password: 'password',
  //     };
  //     jest.spyOn(userService, 'createUser').mockResolvedValue(user);
  //     jest.spyOn(jwtService, 'sign').mockReturnValue('auth-token');
  //
  //     const result = await authService.register(user);
  //     expect(result).toEqual({ authToken: 'auth-token' });
  //   });
  // });
  //
  // describe('login', () => {
  //   it('should return an auth token', async () => {
  //     const user = {
  //       email: 'test@example.com',
  //       password: 'password',
  //     };
  //     jest.spyOn(classToPlain, 'default').mockReturnValue(user);
  //     jest.spyOn(jwtService, 'sign').mockReturnValue('auth-token');
  //
  //     const result = await authService.login(user);
  //     expect(result).toEqual({ authToken: 'auth-token' });
  //   });
  // });
});
