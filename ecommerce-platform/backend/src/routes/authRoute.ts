// authController.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import { getClient } from '../database/conn';

export default async function authRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/register', async (request: FastifyRequest, reply: FastifyReply) => {
    const client = await getClient();
    const { username, password, email, firstName, lastName } = request.body as {
      username: string;
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    };

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.query(
        'INSERT INTO "user" (username, password, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5)',
        [username, hashedPassword, email, firstName, lastName]
      );
      reply.code(201).send({ message: 'User registered successfully' });
    } catch (err) {
      console.error('Error registering user:', err);
      reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
      client.release();
    }
  });

  fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const client = await getClient();
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    try {
      const result = await client.query('SELECT * FROM "user" WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) {
        reply.status(401).send({ error: 'Invalid email or password' });
        return;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        reply.status(401).send({ error: 'Invalid email or password' });
        return;
      }

      const token = fastify.jwt.sign({ id: user.id, email: user.email, username: user.username });
      reply.send({ token });
    } catch (err) {
      console.error('Error logging in user:', err);
      reply.status(500).send({ error: 'Internal Server Error' });
    } finally {
      client.release();
    }
  });
}
