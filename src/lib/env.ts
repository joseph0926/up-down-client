import { config as dotenvConfig } from 'dotenv';
import { cleanEnv, str } from 'envalid';
import { resolve } from 'node:path';

const ENV = process.env.NODE_ENV ?? 'development';

dotenvConfig({
  path: resolve(process.cwd(), `.env.${ENV}.local`),
  override: true,
});
dotenvConfig({ path: resolve(process.cwd(), `.env.${ENV}`), override: false });
dotenvConfig({ path: resolve(process.cwd(), '.env'), override: false });

export const config = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'] }),
  CLIENT_URL: str(),
  SERVER_URL: str(),
} as const);
export type Env = Readonly<typeof config>;
