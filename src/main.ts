import firebot, { Plugin } from "@crowbartools/firebot-types";
import { ensureFile, exists } from "fs-extra";
import {
  DEFAULT_INI_FILE_PATH,
  INI_PLUGIN_AUTHOR,
  INI_PLUGIN_DESCRIPTION,
  INI_PLUGIN_ICON_DATA_URI,
  INI_PLUGIN_NAME,
  INI_PLUGIN_NAME_AND_AUTHOR,
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
      backgroundColor: "linear-gradient(180deg,#0ef,#60e,#f4c)",
    },
    version: INI_PLUGIN_VERSION,
    author: INI_PLUGIN_AUTHOR,
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
    //   INI_PLUGIN_VERSION,
    //   INI_PLUGIN_PACKAGE_URL,
    // );
    // if (response && response.isRemoteNewer) {
    //   runRequest.modules.notificationManager.addNotification(
    //     {
    //       title: `New version of ${INI_PLUGIN_NAME_AND_AUTHOR}!`,
    //       message: `Oceanity has released a new version of the ${INI_PLUGIN_NAME} (${response.localVersion} -> ${response.remoteVersion}). Go to https://github.com/Oceanity/firebot-ini/releases/latest to download the new version.`,
    //       type: "update" as NotificationType,
    //     },
    //     false,
    //   );
    // }

    firebot.logger.info(`Loaded Plugin ${INI_PLUGIN_NAME_AND_AUTHOR}`);
  },
};

export default plugin;
