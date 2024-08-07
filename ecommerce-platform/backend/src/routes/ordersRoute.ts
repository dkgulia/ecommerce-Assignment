// orderRoute.ts
import { FastifyInstance } from 'fastify';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../controller/orderController';
import { authenticate } from '../middleware/authMiddleware';

export default async function orderRoutes(fastify: FastifyInstance): Promise<void> {
    // Protected routes
    fastify.get('/orders', { preHandler: authenticate }, getOrders);
    fastify.post('/orders', { preHandler: authenticate }, createOrder);
    fastify.put('/orders/:id', { preHandler: authenticate }, updateOrder);
    fastify.delete('/orders/:id', { preHandler: authenticate }, deleteOrder);
}
