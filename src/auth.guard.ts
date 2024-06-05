import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import users from './userTable';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    const name = headers['name'];
    const pass = headers['pass'];

    let isAuthenticated = false;

    users.forEach((user) => {
      if (user.name == name && user.pass == pass) {
        isAuthenticated = true;
      }
    });

    return isAuthenticated;
  }
}
