import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  // canActivate(context: ExecutionContext) {
  //   const ctx = GqlExecutionContext.create(context);
  //   const { req } = ctx.getContext();
  //
  //   return super.canActivate(
  //     new ExecutionContextHost([req]),
  //   );
  // }
  //
  // handleRequest(err: any, user: any) {
  //   if (err || !user) {
  //     throw err || new AuthenticationError('GqlAuthGuard');
  //   }
  //   return user;
  // }
}
