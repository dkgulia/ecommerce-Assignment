// productRoute.ts
import { FastifyInstance } from 'fastify';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controller/productController';
import { authenticate } from '../middleware/authMiddleware';

export default async function productRoutes(fastify: FastifyInstance): Promise<void> {
    // Protected routes
    fastify.get('/products', getProducts);
    fastify.post('/products', { preHandler: authenticate }, createProduct);
    fastify.put('/products/:id', { preHandler: authenticate }, updateProduct);
    fastify.delete('/products/:id', { preHandler: authenticate }, deleteProduct);
}

