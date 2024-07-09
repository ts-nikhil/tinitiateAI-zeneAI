import { createLogger, format, transports } from 'winston';
import { parseConfig } from '../../lib/config';

const config = parseConfig();
const clientLogFilePath = config['client-log-file'] || 'client.log';

const clientLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: clientLogFilePath })
  ]
});

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { level, message } = req.body;
    clientLogger.log(level, `CLIENT: ${message}`);
    res.status(200).json({ message: 'Client log received' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
