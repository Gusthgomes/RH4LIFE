import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ message: 'Acesso não autorizado' });
  }

  next();
}
