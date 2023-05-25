import { Injectable } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  SignUpCommandInput,
  SignUpCommandOutput,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  ConfirmSignUpCommandOutput,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { AuthUserInput, ConfirmationCodeInput } from '../graphql';

@Injectable()
export class AwsCognitoService {
  private readonly cognitoClient: CognitoIdentityProviderClient;

  constructor(private readonly configService: ConfigService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: 'us-east-1',
    });
  }

  private createSecretHash(email: string): string {
    return crypto
      .createHmac('sha256', this.configService.get('AWS_COGNITO_CLIENT_SECRET'))
      .update(email + this.configService.get('AWS_COGNITO_CLIENT_ID'))
      .digest('base64');
  }

  async registerUser(
    authRegisterUserDto: AuthUserInput,
  ): Promise<SignUpCommandOutput> {
    const { email, password } = authRegisterUserDto;
    const secretHash = this.createSecretHash(email);
    const input: SignUpCommandInput = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      Username: email,
      Password: password,
      SecretHash: secretHash,
    };
    const command = new SignUpCommand(input);
    return this.cognitoClient.send(command);
  }

  async verifyConfirmationCode({
    code,
    email,
  }: ConfirmationCodeInput): Promise<ConfirmSignUpCommandOutput> {
    const secretHash = this.createSecretHash(email);
    const input: ConfirmSignUpCommandInput = {
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      SecretHash: secretHash,
      Username: email,
      ConfirmationCode: code,
    };
    const command = new ConfirmSignUpCommand(input);
    return this.cognitoClient.send(command);
  }

  async login({
    email,
    password,
  }: AuthUserInput): Promise<InitiateAuthCommandOutput> {
    const secretHash = this.createSecretHash(email);
    const input: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.configService.get('AWS_COGNITO_CLIENT_ID'),
      AuthParameters: {
        Region: 'us-east-1',
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    };
    const command = new InitiateAuthCommand(input);
    return this.cognitoClient.send(command);
  }
}
