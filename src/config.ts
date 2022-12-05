import dotenv from 'dotenv';

dotenv.config();

const config = {
  postgresDb: {
    host: process.env.CLIENT_APP_URL,
    port: Number(process.env.SERVER_PORT),
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    logging: Boolean(process.env.POSTGRES_DB_LOGGING),
  },
};

export default config;
