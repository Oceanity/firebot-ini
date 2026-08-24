import { EffectType } from "@crowbartools/firebot-types";
import { WriteIniValueEffectType } from "./write-ini-value";

export const AllIniEffectTypes: Array<EffectType<any>> = [
  WriteIniValueEffectType,
];
