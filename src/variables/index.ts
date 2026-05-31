import { ReplaceVariable } from "@crowbartools/firebot-types";
import { IniKeysReplaceVariable } from "./ini-keys";
import { IniValueReplaceVariable } from "./ini-value";

export const AllIniReplaceVariables: Array<ReplaceVariable> = [
  IniKeysReplaceVariable,
  IniValueReplaceVariable,
];
