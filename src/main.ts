import firebot, { Plugin } from "@crowbartools/firebot-types";
import { ensureFile, exists } from "fs-extra";
import {
  DEFAULT_INI_FILE_PATH,
  INI_PLUGIN_AUTHOR,
  INI_PLUGIN_DESCRIPTION,
  INI_PLUGIN_ICON_BACKGROUND,
  INI_PLUGIN_ICON_DATA_URI,
  INI_PLUGIN_NAME,
  INI_PLUGIN_REPO_URL,
  INI_PLUGIN_VERSION,
} from "./constants";
import { AllIniEffectTypes } from "./effects";
import { AllIniReplaceVariables } from "./variables";

const plugin: Plugin = {
  manifest: {
    name: INI_PLUGIN_NAME,
    description: INI_PLUGIN_DESCRIPTION,
    icon: {
      type: "custom",
      url: INI_PLUGIN_ICON_DATA_URI,
      backgroundColor: INI_PLUGIN_ICON_BACKGROUND,
    },
    version: INI_PLUGIN_VERSION,
    author: INI_PLUGIN_AUTHOR,
    repo: INI_PLUGIN_REPO_URL,
  },
  registers: {
    effects: AllIniEffectTypes,
    variables: AllIniReplaceVariables,
  },
  onLoad: async () => {
    const defaultIniFileExists = await exists(DEFAULT_INI_FILE_PATH);
    if (!defaultIniFileExists) {
      await ensureFile(DEFAULT_INI_FILE_PATH);
      firebot.logger.info(`Created file at ${DEFAULT_INI_FILE_PATH}`);
    }
  },
};

export default plugin;
