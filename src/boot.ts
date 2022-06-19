import dotenv from 'dotenv';
import fs from 'fs';
import { getEnvironment } from './application/helpers';

// get the environment name
const env = getEnvironment();
// env file
const envFilePath = `${process.cwd()}/env/${env}.env`;

export function loadEnv() {
  // console.log(envFilePath)
  let envData = {};
  // load the environment variables by file
  if (fs.existsSync(envFilePath)) {
    envData = dotenv.config({ path: envFilePath }).parsed;
  } else {
    envData = dotenv.config();
  }
  // console.log(envData)
  return envData;
}

// try others
