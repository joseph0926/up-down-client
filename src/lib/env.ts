import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']),
    SERVER_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_CLIENT_URL: z.string().url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
  },
});
export type Env = typeof env;
