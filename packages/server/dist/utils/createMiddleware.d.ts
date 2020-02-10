import { Resolver, GraphQLMiddlewareFunc } from '../types/graphql-utils';
export declare const createMiddleware: (middlewareFunc: GraphQLMiddlewareFunc, resolverFunc: Resolver) => (parent: any, args: any, context: any, info: any) => any;
