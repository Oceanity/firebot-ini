import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { logger } from "@oceanity/firebot-helpers/firebot";
import { objectWalkPath } from "@oceanity/firebot-helpers/object";
import { getErrorMessage } from "@oceanity/firebot-helpers/string";
import { access } from "fs";
import { basename } from "path";
import { DEFAULT_INI_FILE_PATH } from "../constants";
import { readAndParseIniFile } from "../utils/ini-helpers";

export const IniKeysReplaceVariable: ReplaceVariable = {
  definition: {
    handle: "iniKeys",
    description: "Gets the keys of a section from an INI file.",
    usage: "iniKeys[section]",
    categories: ["text"],
    possibleDataOutput: ["text"],
    examples: [
      {
        usage: "iniKeys[path/to/file.ini, section]",
        description: "Gets the keys of a section from a specified INI file.",
      },
    ],
  },
  evaluator: async (_trigger, ...params) => {
    try {
      const path = (await new Promise((res) => {
        if (!params.length || params[0] === basename(params[0]))
          return res(DEFAULT_INI_FILE_PATH);
        try {
          access(params[0], (error) => {
            return res(error ? DEFAULT_INI_FILE_PATH : params.shift());
          });
        } catch (error) {
          return res(DEFAULT_INI_FILE_PATH);
        }
      })) as string;

      // Check if first param is a path to an INI file, and if it exists
      const config = await readAndParseIniFile(path);
      if (!config) {
        throw new Error("No config found at provided path.");
      }

      const [section] = params;
      if (!section) {
        return config;
      }

      const sectionObject = objectWalkPath(config, section);
      if (!sectionObject) {
        throw new Error("No section found at provided path.");
      }

      return Object.keys(sectionObject);
    } catch (error) {
      logger.error(getErrorMessage(error), error);
      return [];
    }
  },
};
