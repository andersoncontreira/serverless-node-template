import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

interface ProjectConstantsType {
  APP_NAME: string;
  APP_VERSION: string;
  APP_ARCH_VERSION: string;
}

interface ProjectRCType<T> {
  [key: string]: T | undefined;
}

const constants = {} as ProjectConstantsType;
const projectrc = `${process.cwd()}/.projectrc`;
let projectVars = {} as ProjectRCType<string>;

// console.log(projectrc)
if (fs.existsSync(projectrc)) {
  projectVars = dotenv.parse(Buffer.from(fs.readFileSync(projectrc))) as ProjectRCType<string>;
}

constants.APP_NAME = path.basename(process.cwd());
if (process.env?.APPLICATION_NAME) {
  constants.APP_NAME = process.env.APPLICATION_NAME;
} else if (projectVars?.APP_NAME) {
  constants.APP_NAME = projectVars.APP_NAME;
}
constants.APP_VERSION = '1.0.0';
if (process.env?.APPLICATION_VERSION) {
  constants.APP_VERSION = process.env.APPLICATION_VERSION;
} else if (projectVars?.APP_VERSION) {
  constants.APP_VERSION = projectVars.APP_VERSION;
}

constants.APP_ARCH_VERSION = 'v1';
if (process.env?.APP_ARCH_VERSION) {
  constants.APP_ARCH_VERSION = process.env.APP_ARCH_VERSION;
} else if (projectVars?.APP_VERSION) {
  constants.APP_ARCH_VERSION = projectVars.APP_ARCH_VERSION;
}

export const { APP_NAME, APP_VERSION, APP_ARCH_VERSION } = constants;
