// pages/api/placeOrder.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, contact, address, nearby, pincode } = req.body;

    if (!fullName || !contact || !address || !pincode) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    try {
      await client.connect();

      const result = await client.query(
        `INSERT INTO orders (full_name, contact, address, nearby, pincode, order_date)
         VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id`,
        [fullName, contact, address, nearby, pincode]
      );

      await client.end();

      const orderId = result.rows[0].id;
      res.status(200).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
