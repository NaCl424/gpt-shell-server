import { readFileSync } from 'fs';
import { join } from 'path';
const yaml = require('js-yaml');

type Config = {
  port: number;
  mongodb: Mongodb,
};

type Mongodb = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

const configPath = join(__dirname, `config.${process.env.NODE_ENV || 'local'}.yml`);
const config = yaml.load(readFileSync(configPath, 'utf8')) as Config;

export default config;
