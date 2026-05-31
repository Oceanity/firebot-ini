import firebot, { ReplaceVariable } from "@crowbartools/firebot-types";
import { objectWalkPath } from "@oceanity/firebot-helpers/object";
import { getErrorMessage } from "@oceanity/firebot-helpers/string";
import { access } from "fs";
import { basename } from "path";
import { DEFAULT_INI_FILE_PATH } from "../constants";
import { readAndParseIniFile } from "../utils/ini-helpers";

export const IniValueReplaceVariable: ReplaceVariable = {
  definition: {
    handle: "ini",
    aliases: ["iniValue"],
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
        if (!params.length || params[0] === basename(params[0] as string))
          return res(DEFAULT_INI_FILE_PATH);
        try {
          access(params[0] as string, (error) => {
            return res(
              error ? DEFAULT_INI_FILE_PATH : (params.shift() as string),
            );
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

      const [section, key] = params;
      if (!section) {
        return config;
      }

      const sectionObject = objectWalkPath(config, section as string);
      if (!sectionObject) {
        throw new Error("No section found at provided path.");
      }

      if (!key) {
        return sectionObject;
      }

      const value = sectionObject[key];
      if (!value) {
        throw new Error("No value found at provided path.");
      }

      return value;
    } catch (error) {
      firebot.logger.error(getErrorMessage(error), error);
      return "";
    }
  },
};
