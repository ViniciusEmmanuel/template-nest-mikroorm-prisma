export const env = () => ({
  app: {
    env: process.env.NODE_ENV,
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST as string,
    port: Number(process.env.DATABASE_PORT),
    name: process.env.DATABASE_NAME as string,
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASSWORD as string,
    maxPool: Number(process.env.DATABASE_MAX_POOL),
  },
});
