import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'zapps.config');

export function parseConfig() {
  const config = {};
  const lines = fs.readFileSync(configPath, 'utf-8').split('\n');
  lines.forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=').map(part => part.trim());
      if (key && value !== undefined) {
        config[key] = value;
      }
    }
  });
  return config;
}
