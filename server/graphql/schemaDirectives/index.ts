import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { userResolve } from './user';
import { driverResolve } from './driver';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field): any {
    const requiredRole = this.args.requires;
    const originalResolve = field.resolve || defaultFieldResolver;

    if (requiredRole === 'USER') field.resolve = userResolve(originalResolve);
    else if (requiredRole === 'DRIVER') field.resolve = driverResolve(originalResolve);
  }
}

export default AuthDirective;
