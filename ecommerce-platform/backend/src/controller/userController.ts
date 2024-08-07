import { FastifyRequest, FastifyReply } from 'fastify';
import { getClient } from '../database/conn';

export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    const client = await getClient();
    try {
        const { filter } = request.query as { filter?: string }; 
        const query = filter ? 'SELECT * FROM "user" WHERE username ILIKE $1' : 'SELECT * FROM "user"';
        const values = filter ? [`%${filter}%`] : [];
        
        const { rows } = await client.query(query, values); 
        reply.send(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const client = await getClient();
    const { username, password, email } = request.body as { username: string; password: string; email: string; };
    try {
        await client.query(
            'INSERT INTO "user" (username, password, email) VALUES ($1, $2, $3)',
            [username, password, email]
        );
        reply.code(201).send({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error creating user:', err);
        reply.code(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const client = await getClient();  
    const { id } = request.params as { id: string };
    const { username, password, email } = request.body as { username: string; password: string; email: string };
    try {
        await client.query(
            'UPDATE "user" SET username = $1, password = $2, email = $3 WHERE id = $4',
            [username, password, email, id]
        );
        reply.send({ status: 'update successful' });
    } catch (err) {
        console.error('Error updating user:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const client = await getClient();
    const { id } = request.params as { id: string };
    try {
        await client.query('DELETE FROM "user" WHERE id = $1', [id]);
        reply.send({ status: 'success' });
    } catch (err) {
        console.error('Error deleting user:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}
