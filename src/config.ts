import dotenv from 'dotenv';
import fs from 'fs';

const defaultConfig = dotenv.parse(fs.readFileSync('default.env'));
const localConfig = dotenv.parse(fs.readFileSync('.env'));

const mainConfig = {
  ...defaultConfig,
  ...localConfig,
};

const config = {
  postgresDb: {
    host: mainConfig.POSTGRES_DB_HOST,
    port: Number(mainConfig.POSTGRES_DB_PORT),
    user: mainConfig.POSTGRES_DB_USER,
    password: mainConfig.POSTGRES_DB_PASSWORD,
    database: mainConfig.POSTGRES_DB_NAME,
    logging: mainConfig.POSTGRES_DB_LOGGING === 'true',
  },
  source: {
    port: mainConfig.SERVER_PORT,
  },
  verify: {
    passwordSalt: mainConfig.PASSWORD_HASH_SALT_ROUND,
    jwtSecret: mainConfig.TOKEN_SECRET,
  },
};

export default config;
