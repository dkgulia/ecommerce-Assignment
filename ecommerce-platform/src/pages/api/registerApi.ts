// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, username, email, password } = req.body;

    try {
      const newUser = { 
        id: new Date().toISOString(), 
        first_name: firstName, 
        last_name: lastName, 
        username, 
        password, 
        email 
      };

      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
    