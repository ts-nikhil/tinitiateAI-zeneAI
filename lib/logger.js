import log from 'loglevel';

// Fetch configuration from the server
async function fetchConfig() {
  const res = await fetch('/api/config');
  const config = await res.json();
  return config;
}

// Set up logger based on configuration
async function setupLogger() {
  const config = await fetchConfig();
  const level = config['client-logging-level'] || 'info' || 'warn' || 'error';
  const loggingEnabled = config['client-logging'] === 'true';
  const loggingPath = config['client-logging-path'] || '/api/client-log';

  if (!loggingEnabled) {
    log.setLevel('silent');
    return;
  }

  const originalFactory = log.methodFactory;

  log.methodFactory = (methodName, logLevel, loggerName) => {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);

    return (message) => {
      const timestamp = new Date().toISOString();
      const logMessage = `${timestamp} [${methodName.toUpperCase()}]: ${message}`;

      rawMethod(logMessage);

      // Send the log to the server
      fetch(loggingPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level: methodName, message: logMessage }),
      });
    };
  };

  log.setLevel(level);
}

setupLogger();

export default log;
