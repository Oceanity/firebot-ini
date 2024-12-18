import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { logger } from "@oceanity/firebot-helpers/firebot";
import { objectWalkPath } from "@oceanity/firebot-helpers/object";
import { getErrorMessage } from "@oceanity/firebot-helpers/string";
import { DEFAULT_INI_FILE_PATH } from "../constants";
import { readAndParseIniFile } from "../utils/ini-helpers";

export const IniValueReplaceVariable: ReplaceVariable = {
  definition: {
    handle: "iniValue",
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
      const path = params.length >= 3 ? params.shift() : DEFAULT_INI_FILE_PATH;

      const config = await readAndParseIniFile(path);

      return objectWalkPath(config, params.join("."));
    } catch (error) {
      logger.error(getErrorMessage(error), error);
      return "";
    }
  },
};
