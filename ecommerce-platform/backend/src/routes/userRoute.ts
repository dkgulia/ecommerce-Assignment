import { FastifyInstance } from 'fastify';
import { getUsers, createUser, updateUser, deleteUser } from '../controller/userController';
import { authenticate } from '../middleware/authMiddleware';

export default async function userRoutes(fastify: FastifyInstance): Promise<void> {
    // Protected routes
    fastify.get('/users', { preHandler: authenticate }, getUsers);
    fastify.post('/users', { preHandler: authenticate }, createUser);
    fastify.put('/users/:id', { preHandler: authenticate }, updateUser);
    fastify.delete('/users/:id', { preHandler: authenticate }, deleteUser);
}
