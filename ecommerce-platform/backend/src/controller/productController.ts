import { FastifyRequest, FastifyReply } from 'fastify';
import { getClient } from '../database/conn';

export async function getProducts(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const client = await getClient();
    try {
        const { filter } = request.query as { filter?: string };
        const query = filter ? 'SELECT * FROM product WHERE name ILIKE $1' : 'SELECT * FROM product';
        const values = filter ? [`%${filter}%`] : [];
        
        const { rows } = await client.query(query, values);
        reply.send(rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export async function createProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const client = await getClient();
    const { name, description, price, category, stock, rating } = request.body as { 
        name: string; description: string; price: number; category: string; stock: number; rating: number; 
    };
    try {
        await client.query(
            'INSERT INTO product (name, description, price, category, stock, rating) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, description, price, category, stock, rating]
        );
        reply.code(201).send({ message: 'Product created successfully' });
    } catch (err) {
        console.error('Error adding product:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export async function updateProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const client = await getClient();
    const { id } = request.params as { id: string };
    const { name, description, price, category, stock, rating } = request.body as { 
        name: string; description: string; price: number; category: string; stock: number; rating: number; 
    };
    try {
        await client.query(
            'UPDATE product SET name = $1, description = $2, price = $3, category = $4, stock = $5, rating = $6 WHERE id = $7',
            [name, description, price, category, stock, rating, id]
        );
        reply.send({ status: 'update successful' });
    } catch (err) {
        console.error('Error updating product:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export async function deleteProduct(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const client = await getClient();
    const { id } = request.params as { id: string };
    try {
        await client.query('DELETE FROM product WHERE id = $1', [id]);
        reply.send({ status: 'success' });
    } catch (err) {
        console.error('Error deleting product:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}
