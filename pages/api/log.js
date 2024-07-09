import logger from '../../lib/serverLogger';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { level, message } = req.body;
    logger.log(level, `SERVER: ${message}`);
    res.status(200).json({ message: 'Server log received' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
