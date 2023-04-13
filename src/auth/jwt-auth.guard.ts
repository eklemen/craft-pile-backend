import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // req used in http queries and mutations, connection is used in websocket subscription connections, check AppModule
    const { req, connection } = ctx.getContext();

    // if subscriptions/webSockets, let it pass headers from connection.context to passport-jwt
    return connection && connection.context && connection.context.headers
      ? connection.context
      : req;
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
