import { resolve } from "path";
import * as packageJson from "../package.json";

export const {
  displayName: INI_PLUGIN_NAME,
  description: INI_PLUGIN_DESCRIPTION,
  author: INI_PLUGIN_AUTHOR,
  version: INI_PLUGIN_VERSION,
} = packageJson;

export const INI_PLUGIN_ID = "oceanity:ini";
export const INI_PLUGIN_REPO_URL = "https://github.com/Oceanity/firebot-ini";
export const DEFAULT_INI_FILE_PATH = resolve(__dirname, "../firebot.ini");

export const INI_PLUGIN_ICON_DATA_URI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAi5QTFRFAAAA7///7///7///5fX13u7u7///7///7v//cMLFdMPH5PT03u7u3u7u4/n53Pb22vX1K6CmLqGn2/b23fb34fj53u7u3u7u3+/v6vz9U7S4O6itfsjMBY2UBY6UOKeseMXJOqitTrG26Pz83u7u3+/vAIuSOaes3u7u3+/vesbJA4yTIJuhIZuhA42Tc8PH3u7u3+/vMqOptuTluOXmNaWqM6Sp6Pj44/Pz5PT06vr6b8HFJJ2jCpCXsOHjtOLkDZKYHpmgcMHFH5qgCpCWr+DiDpKYIpyiPKitMKKosuLktOPkAoyTHpqgdcTH6v39QquwOKasVrW5fMfLPamuBo6Ve8fKPqmvUbK34/n6LqKn2vX23vf34vn57v7/ab7CPKiuNqWrCpCWAIuSAIuSAIuS7v3+u+HlKp6kOqarJZyiFpWcKZ6kCY+WMKGnOKWqDZGYAIuS5+nxqcbStd3f+f39ndPVsdzeJ52jFJSbz+nr8vn6N6Sq5OHtqMTRud/h////odXX/P7+8Pj4P6ittt7gKJ6kFZWb1Ozt+Pz8OaWqu+Di+/39E5Satd7gfMPH3/Hx7vf4Y7i9Ybe8dcHE5PP0t97gYbi8F5Wc1Ovt+v39qcTRAYuSi8rNv+LkecLGSayxH5mfmtHUHpmfEJKZn9PWuuDiAIuSxs7cOp+oHJWdGZObBIyTAIuSAIuS4dnn0tLhxM7cwczaaa65AIuSAIuS7Pf66/X56/X56/X54RHQsgAAALp0Uk5TABfS/7ooIN//////5Sb///////////+3E///////////////thL//7Uz////////0jL/////////rg3///////////////////////////////////////////////////fHwL9v///////////////q///////////////////////////////////////////////////////////////////////9////++PfpP///+M8IAj//98gHOzfxQAAAZhJREFUeJyV098rQ2EYB/Dnu41tzhiTYWolhdqV2h1ulCkkbtSuXOxW7VJx5YZy4x9wpablaiVckEKUhJIoSstqfkwalozDcV5nO86vDp469fa8n/M+708QEQBSB/AuN8WvFDxrlgD5QtYBPGsAh1y5OFK2Cg8McMCNCnjFTsGC70gyQBW4UAELVxySlwB5cKYs0cKzOeCVnCckAfLhSAHqOHKJ4JEqD8RMENJadosgiDuqxQ51IE0N2CxUswlvMnCkyI8N6rAnqXE7rwc8dV9SE5DJkvtQ3i4VqC+jZrw4z6l12RD047SQDRwnDYE15Qf2PtqBfUNAwyu5qtBqbzyMBeM5sLC3NcWUZ6oD2vg38PRq7o10uDKI4PS2C1jvAlnWKPRhSwwBK30/IIolGgASAyDEHUOfVvb7oqLEOOIUBmJhiBdnfuS9lIE5Q8Ah48WTCXCLPVcuE1CN+xrcmYBa4NqXNgOzo2850gM/ZsaA6TFYpiYg3eGtjUkFCGhfINtGxU5GO38BkUH9E+7542nqn78UgiAQfQFoB5wLguDtRgAAAABJRU5ErkJggg==";
export const INI_PLUGIN_ICON_BACKGROUND =
  "linear-gradient(180deg,#0ef,#60e,#f4c)";
