import { APP_ARCH_VERSION, APP_VERSION } from '../constants';

export const CUSTOM_DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Custom-Arch-Version': APP_ARCH_VERSION,
  'Custom-Service-Version': APP_VERSION,
  // Removed cors headers because the cors express plugin
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PATH, PUT, DELETE',
  // 'Access-Control-Allow-Headers': 'Content-Type'
};
