import { parseConfig } from '../../lib/config';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const users = require('../../public/user.json');

    const user = users.find(user => user.username === email && user.password === password);

    if (user) {
      res.status(200).json({ message: 'Login successful', role: user.role, username: user.username });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
