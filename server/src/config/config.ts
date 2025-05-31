import * as path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

class Config {
  public readonly port: number;
  public readonly dbHost: string;
  public readonly dbUser: string;
  public readonly dbPassword: string;
  public readonly dbName: string;

  constructor() {
    this.port = parseInt(this.getEnv('PORT', '3000'));
    this.dbHost = this.getEnv('DB_HOST');
    this.dbUser = this.getEnv('DB_USER');
    this.dbPassword = this.getEnv('DB_PASSWORD');
    this.dbName = this.getEnv('DB_NAME');
  }
  private getEnv(key: string, fallback?: string): string {
    const value = process.env[key];
    if (value !== undefined) return value;
    if (fallback !== undefined) return fallback;
    throw new Error(`Environment variable ${key} is required but not set`);
  }
}

console.log('ENV:', process.env.DB_HOST); // should log: 'localhost'

export const config = new Config();
