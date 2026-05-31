import firebot, { Plugin } from "@crowbartools/firebot-types";
import { ensureFile, exists } from "fs-extra";
import {
  DEFAULT_INI_FILE_PATH,
  INI_INTEGRATION_AUTHOR,
  INI_INTEGRATION_DESCRIPTION,
  INI_INTEGRATION_NAME_AND_AUTHOR,
  INI_INTEGRATION_VERSION,
} from "./constants";
import { AllIniEffectTypes } from "./effects";
import { AllIniReplaceVariables } from "./variables";

const plugin: Plugin = {
  manifest: {
    name: INI_INTEGRATION_NAME_AND_AUTHOR,
    description: INI_INTEGRATION_DESCRIPTION,
    icon: "fa-file",
    color: "#999",
    version: INI_INTEGRATION_VERSION,
    author: INI_INTEGRATION_AUTHOR,
    type: "plugin",
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

    // TODO: Reimplement when plugins can access notificationManger
    // const response = await remoteVersionCheck(
    //   INI_INTEGRATION_VERSION,
    //   INI_INTEGRATION_PACKAGE_URL,
    // );
    // if (response && response.isRemoteNewer) {
    //   runRequest.modules.notificationManager.addNotification(
    //     {
    //       title: `New version of ${INI_INTEGRATION_NAME_AND_AUTHOR}!`,
    //       message: `Oceanity has released a new version of the ${INI_INTEGRATION_NAME} (${response.localVersion} -> ${response.remoteVersion}). Go to https://github.com/Oceanity/firebot-ini/releases/latest to download the new version.`,
    //       type: "update" as NotificationType,
    //     },
    //     false,
    //   );
    // }

    firebot.logger.info(`Loaded Plugin ${INI_INTEGRATION_NAME_AND_AUTHOR}`);
  },
};

export default plugin;
