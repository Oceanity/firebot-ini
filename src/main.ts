import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { NotificationType } from "@crowbartools/firebot-custom-scripts-types/types/modules/notification-manager";
import {
  effectManager,
  initModules,
  logger,
  replaceVariableManager,
} from "@oceanity/firebot-helpers/firebot";
import { remoteVersionCheck } from "@oceanity/firebot-helpers/package";
import { ensureFile, exists } from "fs-extra";
import {
  DEFAULT_INI_FILE_PATH,
  INI_INTEGRATION_AUTHOR,
  INI_INTEGRATION_DESCRIPTION,
  INI_INTEGRATION_FIREBOT_VERSION,
  INI_INTEGRATION_NAME,
  INI_INTEGRATION_PACKAGE_URL,
  INI_INTEGRATION_VERSION,
} from "./constants";
import { AllIniEffectTypes } from "./effects";
import { AllIniReplaceVariables } from "./variables";

interface Params {}

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
  getDefaultParameters: () => ({}),
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
      replaceVariableManager.registerReplaceVariable(variable);
    }

    // Check for updates
    const response = await remoteVersionCheck(
      INI_INTEGRATION_VERSION,
      INI_INTEGRATION_PACKAGE_URL,
    );
    if (response && response.isRemoteNewer) {
      runRequest.modules.notificationManager.addNotification(
        {
          title: `New version of ${INI_INTEGRATION_NAME}!`,
          message: `Oceanity has released a new version of the ${INI_INTEGRATION_NAME} (${response.localVersion} -> ${response.remoteVersion}). Go to https://github.com/Oceanity/firebot-ini/releases/latest to download the new version.`,
          type: "update" as NotificationType,
        },
        false,
      );
    }
  },
  stop: (uninstalling: boolean) => {
    for (const effectType of AllIniEffectTypes) {
      effectManager.unregisterEffect(effectType.definition.id);
    }

    for (const variable of AllIniReplaceVariables) {
      replaceVariableManager.unregisterReplaceVariable(
        variable.definition.handle,
      );
    }

    if (uninstalling) {
      logger.info("Successfully uninstalled Ini Extension!");
    }
  },
};

export default script;
