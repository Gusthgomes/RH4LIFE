import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/utils/db';
import Vagas from '@/models/Vagas';

// Handler para a rota /api/vaga
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Conectar ao banco de dados MongoDB
  await connectToDatabase();

  if (req.method === 'POST') {
    // Criar uma nova vaga
    try {
      const novaVaga = new Vagas(req.body);
      await novaVaga.save();
      res.status(201).json({ success: true, data: novaVaga });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (req.method === 'GET') {
    // Obter todas as vagas
    try {
      const vagas = await Vagas.find({});
      res.status(200).json({ success: true, data: vagas });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).json({ success: false, message: 'Método não permitido' });
  }
};

export default handler;
