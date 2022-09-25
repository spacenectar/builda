import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export default (message: string) => {
  const logFile = path.resolve(process.cwd(), 'logfile.txt');
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  if (fs.existsSync(logFile)) {
    fs.appendFileSync(logFile, logMessage);
  } else {
    fs.writeFileSync(logFile, logMessage);
  }
};
