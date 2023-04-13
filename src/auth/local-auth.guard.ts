import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthUserInput } from '../graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    if (gqlReq) {
      const { input } = ctx.getArgs<{
        input: AuthUserInput;
      }>();
      gqlReq.body = input;
      return gqlReq;
    }
    return context.switchToHttp().getRequest();
  }
}
