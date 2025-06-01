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
  public readonly baseUrl: string;
  public readonly smtpHost: string;
  public readonly smtpPort: number;
  public readonly smtpUser: string;
  public readonly smtpPass: string;
  public readonly smtpSecure: boolean;
  public readonly contactAdminEmail: string;

  constructor() {
    this.port = parseInt(this.getEnv('PORT', '3000'));
    this.dbHost = this.getEnv('DB_HOST');
    this.dbUser = this.getEnv('DB_USER');
    this.dbPassword = this.getEnv('DB_PASSWORD');
    this.dbName = this.getEnv('DB_NAME');
    this.baseUrl = this.getEnv('BASE_URL');
    this.smtpHost = this.getEnv('SMTP_HOST');
    this.smtpPort = parseInt(this.getEnv('SMTP_PORT', '587'));
    this.smtpUser = this.getEnv('SMTP_USER');
    this.smtpPass = this.getEnv('SMTP_PASS');
    this.smtpSecure = this.getEnv('SMTP_SECURE', 'false') === 'true';
    this.contactAdminEmail = this.getEnv('CONTACT_ADMIN_EMAIL');
  }
  private getEnv(key: string, fallback?: string): string {
    const value = process.env[key];
    if (value !== undefined) return value;
    if (fallback !== undefined) return fallback;
    throw new Error(`Environment variable ${key} is required but not set`);
  }
}


export const config = new Config();
