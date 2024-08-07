import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
});

// Function to get a database client
export const getClient = async () => {
  const client = await pool.connect();
  return client;
};
