import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req, connection } = ctx.getContext();

    return connection && connection.context && connection.context.headers
      ? connection.context
      : req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const canActivate = super.canActivate(context);
    if (canActivate instanceof Observable) {
      return canActivate.toPromise();
    }
    return canActivate;
  }

  handleRequest(err: any, user: any, info: Error) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(info ? info.message : 'Authentication failed')
      );
    }
    return user;
  }
}
