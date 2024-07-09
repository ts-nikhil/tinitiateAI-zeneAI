import logger from '../../lib/serverLogger';
import user from '../../public/user.json';

export default function handler(req, res) {
  const { email, password } = req.body;

  logger.info('API login attempt', { email });

  if (email === user.username && password === user.password) {
    logger.info('API login successful', { email });
    res.status(200).json({ message: 'Login successful',role:user.role });
  } else {
    logger.error('API login failed', { email });
    res.status(401).json({ message: 'Invalid email or password' });
  }
}
