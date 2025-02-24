import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { logger } from "@oceanity/firebot-helpers/firebot";
import { objectWalkPath } from "@oceanity/firebot-helpers/object";
import { getErrorMessage } from "@oceanity/firebot-helpers/string";
import { access } from "fs";
import { resolve } from "path";
import { DEFAULT_INI_FILE_PATH } from "../constants";
import { readAndParseIniFile } from "../utils/ini-helpers";

export const IniValueReplaceVariable: ReplaceVariable = {
  definition: {
    handle: "iniValue",
    //@ts-expect-error ts2353
    aliases: ["ini"],
    description: "Gets a value from an INI file.",
    usage: "iniValue[section, key]",
    categories: ["text"],
    possibleDataOutput: ["text"],
    examples: [
      {
        usage: "iniValue[path/to/file.ini, section, key]",
        description: "Gets a value from a specified INI file.",
      },
    ],
  },
  evaluator: async (_trigger, ...params) => {
    try {
      const path = (await new Promise((res) => {
        if (!params.length || !params[0].endsWith(".ini"))
          return res(DEFAULT_INI_FILE_PATH);
        try {
          access(resolve(__dirname, "../", params[0]), (error) => {
            return res(
              error
                ? DEFAULT_INI_FILE_PATH
                : resolve(__dirname, "../", params.shift())
            );
          });
        } catch (error) {
          return res(DEFAULT_INI_FILE_PATH);
        }
      })) as string;

      // Check if first param is a path to an INI file, and if it exists
      const config = await readAndParseIniFile(path);
      if (!config) {
        throw new Error(`No config found at path: ${path}`);
      }

      const [section, key] = params;

      if (!section) {
        return config;
      }

      const sectionObject = objectWalkPath(config, section);
      if (!sectionObject) {
        throw new Error(`No section found at provided path: ${section}.`);
      }

      if (!key) {
        return sectionObject;
      }

      const value = sectionObject[key];
      if (!value) {
        throw new Error(`No value found at provided path: ${key}.`);
      }

      return value;
    } catch (error) {
      logger.error(getErrorMessage(error), error);
      return "";
    }
  },
};
