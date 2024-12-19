import { logger } from "@oceanity/firebot-helpers/firebot";
import { getErrorMessage } from "@oceanity/firebot-helpers/string";
import { readFile } from "fs-extra";
import { parse } from "ini";

export const sanitizedKey = (key: string) => key.replace(/[\[\]:=]/g, "_");

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
  let current = walkToSection(config, section, true);

  current[key] = value;

  return config;
}

export function deleteFromIniObject(
  config: Record<string, any>,
  section: string,
  key: string
): Record<string, any> {
  let current = walkToSection(config, section, false);

  delete current[key];

  return config;
}

export function appendToIniObjectArray(
  config: Record<string, any>,
  section: string,
  key: string,
  value: string
): Record<string, any> {
  let current = walkToSection(config, section, true);

  if (current[key] === undefined) {
    current[key] = [value];
  } else {
    current[key].push(value);
  }

  return config;
}

export function removeFromIniObjectArray(
  config: Record<string, any>,
  section: string,
  key: string,
  value: string
): Record<string, any> {
  let current = walkToSection(config, section, false);

  if (current[key] === undefined) {
    throw new Error("Value not found");
  }

  const index = current[key].indexOf(value);
  if (index === -1) {
    throw new Error("Value not found");
  } else {
    current[key].splice(index, 1);
  }

  return config;
}

function walkToSection(
  config: Record<string, any>,
  section: string,
  createMissing: boolean
): Record<string, any> {
  let current = config;

  for (const sectionFragment of section.split(".")) {
    if (
      current[sectionFragment] === undefined ||
      typeof current[sectionFragment] !== "object"
    ) {
      if (createMissing) {
        current[sectionFragment] = {};
      } else {
        throw new Error("Section not found");
      }
    }
    current = current[sectionFragment] as Record<string, any>;
  }

  return current;
}
