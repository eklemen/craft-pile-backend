import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import {
  AuthUserInput,
  AuthUserToken,
  ConfirmationCodeInput,
  RegistrationOutput,
} from '../graphql';
import { AuthService } from './auth.service';
import { AwsCognitoService } from './aws-cognito.service';
import { UserInputError, AuthenticationError } from 'apollo-server-express';

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

  @Mutation()
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
}
