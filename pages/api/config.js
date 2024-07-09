import { parseConfig } from '../../lib/config';

export default function handler(req, res) {
  const config = parseConfig();
  res.status(200).json(config);
}
