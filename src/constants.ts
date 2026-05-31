import { resolve } from "path";
import * as packageJson from "../package.json";

export const {
  displayName: INI_PLUGIN_NAME,
  description: INI_PLUGIN_DESCRIPTION,
  author: INI_PLUGIN_AUTHOR,
  version: INI_PLUGIN_VERSION,
} = packageJson;

export const INI_PLUGIN_NAME_AND_AUTHOR = `${INI_PLUGIN_NAME} (by ${INI_PLUGIN_AUTHOR})`;
export const INI_PLUGIN_ID = "oceanity:ini";
export const DEFAULT_INI_FILE_PATH = resolve(__dirname, "../firebot.ini");
export const INI_PLUGIN_PACKAGE_URL =
  "https://raw.githubusercontent.com/Oceanity/firebot-ini/refs/heads/main/package.json";
