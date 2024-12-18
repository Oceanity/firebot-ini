import { logger } from "@oceanity/firebot-helpers/firebot";
import { getErrorMessage } from "@oceanity/firebot-helpers/string";
import { readFile } from "fs-extra";
import { parse } from "ini";

export async function readAndParseIniFile(
  filePath: string
): Promise<Record<string, any>> {
  try {
    const text = await readFile(filePath, "utf8");

    return parse(text);
  } catch (error) {
    logger.error(getErrorMessage(error), error);
  }
}

export function insertToIniObject(
  config: Record<string, any>,
  section: string,
  key: string,
  value: string
): Record<string, any> {
  let current = config;

  for (const sectionFragment of section.split(".")) {
    if (
      current[sectionFragment] === undefined ||
      typeof current[sectionFragment] !== "object"
    ) {
      current[sectionFragment] = {};
    }
    current = current[sectionFragment] as Record<string, any>;
  }
  current[key] = value;

  return config;
}

export function deleteFromIniObject(
  config: Record<string, any>,
  section: string,
  key: string
): Record<string, any> {
  let current = config;

  for (const sectionFragment of section.split(".")) {
    if (
      current[sectionFragment] === undefined ||
      typeof current[sectionFragment] !== "object"
    ) {
      throw new Error("Section not found");
    }
    current = current[sectionFragment] as Record<string, any>;
  }
  delete current[key];

  return config;
}
