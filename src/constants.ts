import { resolve } from "path";
import * as packageJson from "../package.json";

export const {
  displayName: INI_PLUGIN_NAME,
  description: INI_PLUGIN_DESCRIPTION,
  author: INI_PLUGIN_AUTHOR,
  version: INI_PLUGIN_VERSION,
} = packageJson;

export const INI_PLUGIN_NAME_AND_AUTHOR = `${INI_PLUGIN_NAME} (by ${INI_PLUGIN_AUTHOR})`;
export const INI_PLUGIN_ID = "oceanity:ini";
export const DEFAULT_INI_FILE_PATH = resolve(__dirname, "../firebot.ini");
export const INI_PLUGIN_PACKAGE_URL =
  "https://raw.githubusercontent.com/Oceanity/firebot-ini/refs/heads/main/package.json";

export const INI_PLUGIN_ICON_DATA_URI =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAZVQTFRFAAAA8PDw8PDw3d3d1NTU8PDw2tra09PT1NTU2tra0tLS09PTiqm7EFR7ClB4F1l/4+fptcfRzdfdVoWguMnTw9DYxNLZ0tLS7+/vE1Z9IF+DFlh+GluBMmyNv87X4eHh4uLiz9nfOXGRE1d9UoKecZeuO3KSDVJ6Yo2m8PDwSHuYq8DM7u/v7e7uGFl/a5Orp77KDFF55OfqcJeuP3WU3uTn2ODkb5atC1F4w9HZ7+/wJ2SHnLXEqr/MIGCEUoOe4+fqN2+Q7e7vbJSrH1+DpLvJwM7XUIGdcJetImGFcpmv5ejq7/Dw6+3ufqG1EFV76+zt7O7ug6S3faC09NqY98VB+MM8+bkS+rQA+rQA+rQA+rQAJFtrnY0vxZ4bSmtY3agPWnFQnI0vJVtrkYg1N2Nivpse46oME1Rzen9ARmlaJ1xq0KMVOGNhb3pGbnpGN2Nh6q4IIVptC1F3e39AtJcj1KQTh4Q6664If4E+98RB6Nq45sVv5sNp8roq+rQA+rQA+rQA7e3t6enp6enp8PDw8PDwGFpwvQAAAId0Uk5TALH/syK/+LMR//8y///////////////4//////////8h//////////9A////////////////////////////////////////////////////////////z7+6Xv//////////////////////////////////////////////n4B6Mf//QPE5PQNuwgAAAXVJREFUeJyd0zlLA0EUB/D3TyYbNMQ0iZAiKOIBEYugaGGjYCWC4PFdVAQFv4ta2CiIWFhYKIIIAUHxAgXBkFgYc7iuO1lfEuMeGSL4YNmdnd+8nZ03AyKAXAGYzhZRQLqBAPSWIAgpSq0BSTvHL2gHUGgAktJ0gQ7u/SLSgNc6CL81ctRAZzGMIjfC7J4pka12GIlHG3TxwBh3ZiiO28bHB65tEI3yOFwNfma6cakCSYGH3jRR6q4fFyowAh6Os6SeHcKpCowjTSkjmNNzNHysAhM4/3k7iiMVoCn+hRN+ivXgQAmmsT9z8zKJ+75dUgKOsTgOy86SeEFT/APMubcWt4BNJ5jXmrJUtpxgIYA9otlq5TUpdogWdbntBn7eELB8eI+YsCzLkF5AIZGnkM+PilmiCF9qEOQ05VZAsCioQX0OIh8vVtRz0NqIQrwtE5AWn4wPww2Wnv5Yh2XFSq45wbr7EGPVWwtP2MXyHv96bGCldv8GtJ2jIeXdRYAAAAAASUVORK5CYII=";
