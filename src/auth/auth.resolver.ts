import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import {
  AuthUserInput,
  AuthUserToken,
  ConfirmationCodeInput,
  ConfirmForgotPasswordInput,
  ForgotPasswordInput,
  RegistrationOutput,
  ResetPasswordOutput,
} from '../graphql';
import { AuthService } from './auth.service';
import { AwsCognitoService } from './aws-cognito.service';
import { UserInputError } from 'apollo-server-express';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly awsCognitoService: AwsCognitoService,
  ) {}

  @Mutation('registerUser')
  async registerUser(
    @Args('input') input: AuthUserInput,
  ): Promise<RegistrationOutput> {
    try {
      await this.awsCognitoService.registerUser(input);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  @Mutation('verifyConfirmationCode')
  async verifyConfirmationCode(@Args('input') input: ConfirmationCodeInput) {
    try {
      await this.awsCognitoService.verifyConfirmationCode(input);
      return {
        success: true,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
      };
    }
  }

  @Mutation('login')
  async login(@Args('input') input: AuthUserInput): Promise<AuthUserToken> {
    const res = await this.awsCognitoService.login(input);
    if (!res?.AuthenticationResult) {
      throw new UserInputError('Email or password are incorrect.');
    }
    const { AccessToken, ExpiresIn, IdToken, RefreshToken } =
      res?.AuthenticationResult;
    return {
      accessToken: AccessToken,
      expiresIn: ExpiresIn,
      idToken: IdToken,
      refreshToken: RefreshToken,
    };
  }

  @Mutation('forgotPassword')
  async forgotPassword(
    @Args('input') input: ForgotPasswordInput,
  ): Promise<ResetPasswordOutput> {
    try {
      await this.awsCognitoService.forgotPassword(input);
      return { success: true };
    } catch (err) {
      throw new HttpException(
        `ForgotPassword: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation('confirmForgotPassword')
  async confirmForgotPassword(
    @Args('input') input: ConfirmForgotPasswordInput,
  ): Promise<ResetPasswordOutput> {
    try {
      await this.awsCognitoService.confirmForgotPassword(input);
      return { success: true };
    } catch (err) {
      throw new HttpException(
        `ForgotPassword: ${err}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
