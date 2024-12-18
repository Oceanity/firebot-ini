import { resolve } from "path";
import * as packageJson from "../package.json";

export const {
  displayName: INI_INTEGRATION_NAME,
  description: INI_INTEGRATION_DESCRIPTION,
  author: INI_INTEGRATION_AUTHOR,
  version: INI_INTEGRATION_VERSION,
} = packageJson;

export const INI_INTEGRATION_ID = "oceanity:ini";
export const INI_INTEGRATION_FIREBOT_VERSION = "5";
export const DEFAULT_INI_FILE_PATH = resolve(__dirname, "../firebot.ini");
