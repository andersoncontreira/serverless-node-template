import fs from 'fs';
import dotenv from 'dotenv';

let projectVars = {};
const projectrc = `${process.cwd()}/.projectrc`;
if (fs.existsSync(projectrc)) {
  projectVars = dotenv.parse(Buffer.from(fs.readFileSync(projectrc)));
}

export const APP_NAME = process.env?.APPLICATION_NAME
  ? process.env.APPLICATION_NAME
  : projectVars.APP_NAME;
export const APP_VERSION = process.env?.APPLICATION_VERSION
  ? process.env.APPLICATION_VERSION
  : projectVars.APP_VERSION;
export const APP_ARCH_VERSION = process.env?.APP_ARCH_VERSION
  ? process.env.APP_ARCH_VERSION
  : projectVars.APP_ARCH_VERSION ? projectVars.APP_ARCH_VERSION : 'v1';

// console.log(APP_NAME, APP_VERSION, APP_ARCH_VERSION)
