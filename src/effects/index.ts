import { INI_INTEGRATION_ID } from "../constants";
import { WriteIniValueEffectType } from "./write-ini-value";

export const AllIniEffectTypes = [WriteIniValueEffectType].map((effectType) => {
  effectType.definition.id = `${INI_INTEGRATION_ID}:${effectType.definition.id}`;

  return effectType;
});
