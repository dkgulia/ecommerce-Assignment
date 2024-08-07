import Fastify from 'fastify';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import userRoutes from './routes/userRoute';
import productRoutes from './routes/productRoute';
import orderRoutes from './routes/ordersRoute';
import FastifyJwt from '@fastify/jwt';
import authRoutes from './routes/authRoute';
import fastifyCors from '@fastify/cors';

// Load environment variables from .env file
dotenv.config();

const fastify = Fastify({ logger: true });

//cors
fastify.register(fastifyCors, {
  origin: '*', // Allow all origins. Change this to your frontend's domain in production.
});


// Configure the database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    fastify.log.info('Database connected successfully');
    client.release();
  } catch (error: unknown) {
    if (error instanceof Error) {
      fastify.log.error(`Database connection error: ${error.message}`);
    } else {
      fastify.log.error('Unknown database connection error');
    }
  }
};

// Register JWT plugin
fastify.register(FastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecret', 
  sign: { expiresIn: '1h' }
});

// Register routes
fastify.register(userRoutes);
fastify.register(productRoutes);
fastify.register(orderRoutes);
fastify.register(authRoutes);

// Test route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) || 3000 });
    fastify.log.info(`Server is running on port ${process.env.PORT || 3000}`);
    await testDbConnection();
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
