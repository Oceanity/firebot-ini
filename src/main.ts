import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import {
  effectManager,
  initModules,
  logger,
  variableManager,
} from "@oceanity/firebot-helpers/firebot";
import { exists, ensureFile } from "fs-extra";
import {
  DEFAULT_INI_FILE_PATH,
  INI_INTEGRATION_AUTHOR,
  INI_INTEGRATION_DESCRIPTION,
  INI_INTEGRATION_FIREBOT_VERSION,
  INI_INTEGRATION_NAME,
  INI_INTEGRATION_VERSION,
} from "./constants";
import { AllIniReplaceVariables } from "./variables";
import { AllIniEffectTypes } from "./effects";

interface Params {
  message: string;
}

const script: Firebot.CustomScript<Params> = {
  getScriptManifest: () => {
    return {
      name: INI_INTEGRATION_NAME,
      description: INI_INTEGRATION_DESCRIPTION,
      author: INI_INTEGRATION_AUTHOR,
      version: INI_INTEGRATION_VERSION,
      firebotVersion: INI_INTEGRATION_FIREBOT_VERSION,
    };
  },
  getDefaultParameters: () => {
    return {
      message: {
        type: "string",
        default: "Hello World!",
        description: "Message",
        secondaryDescription: "Enter a message here",
        title: "Hello!",
      },
    };
  },
  run: async (runRequest) => {
    initModules(runRequest.modules);

    const defaultIniFileExists = await exists(DEFAULT_INI_FILE_PATH);
    if (!defaultIniFileExists) {
      await ensureFile(DEFAULT_INI_FILE_PATH);
      logger.info(`Created file at ${DEFAULT_INI_FILE_PATH}`);
    }

    for (const effectType of AllIniEffectTypes) {
      effectManager.registerEffect(effectType);
    }

    for (const variable of AllIniReplaceVariables) {
      variableManager.registerReplaceVariable(variable);
    }
  },
};

export default script;
