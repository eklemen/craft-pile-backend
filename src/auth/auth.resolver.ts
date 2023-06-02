import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import {
  AuthUserInput,
  ConfirmationCodeInput,
  LoginOutput,
  RegistrationOutput,
} from '../graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AwsCognitoService } from './aws-cognito.service';

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
  async login(@Args('input') input: AuthUserInput): Promise<LoginOutput> {
    try {
      const res = await this.awsCognitoService.login(input);
      const { AccessToken, ExpiresIn, IdToken, RefreshToken } =
        res?.AuthenticationResult;
      return {
        data: {
          accessToken: AccessToken,
          expiresIn: ExpiresIn,
          idToken: IdToken,
          refreshToken: RefreshToken,
        },
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: error,
      };
    }
  }
}
