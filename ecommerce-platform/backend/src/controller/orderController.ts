import { FastifyRequest, FastifyReply } from 'fastify';
import { getClient } from '../database/conn';

export async function getOrders(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const client = await getClient();
    try {
        const { filter } = request.query as { filter?: string };
        const query = filter ? 'SELECT * FROM orders WHERE status ILIKE $1' : 'SELECT * FROM orders';
        const values = filter ? [`%${filter}%`] : [];
        
        const { rows } = await client.query(query, values);
        reply.send(rows);
    } catch (err) {
        console.error('Error fetching orders:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export async function createOrder(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const client = await getClient();
    const { userId, products, totalAmount, status } = request.body as { 
        userId: string; products: object[]; totalAmount: number; status: string; 
    };
    try {
        await client.query(
            'INSERT INTO orders (user_id, products, total_amount, status) VALUES ($1, $2, $3, $4)',
            [userId, JSON.stringify(products), totalAmount, status]
        );
        reply.code(201).send({ message: 'Order created successfully' });
    } catch (err) {
        console.error('Error creating order:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export async function updateOrder(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const client = await getClient();
    const { id } = request.params as { id: string };
    const { userId, products, totalAmount, status } = request.body as { 
        userId: string; products: object[]; totalAmount: number; status: string; 
    };
    try {
        await client.query(
            'UPDATE orders SET user_id = $1, products = $2, total_amount = $3, status = $4 WHERE id = $5',
            [userId, JSON.stringify(products), totalAmount, status, id]
        );
        reply.send({ status: 'update successful' });
    } catch (err) {
        console.error('Error updating order:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export async function deleteOrder(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const client = await getClient();
    const { id } = request.params as { id: string };
    try {
        await client.query('DELETE FROM orders WHERE id = $1', [id]);
        reply.send({ status: 'success' });
    } catch (err) {
        console.error('Error deleting order:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}
