
import '@fastify/jwt';
import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    jwt: any;
  }
}
