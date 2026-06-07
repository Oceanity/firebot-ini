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

export const INI_PLUGIN_ICON_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAPZQTFRFAAAA8PDw8PDw09PT0tLSsMPOZpCoxdLa4eboXImjClB4haa45Ojq0dvgElZ9LmmKLWiKFll/2+Ll1NTUTX+bF1l/gKK2eJ2yE1Z9apOqbpasC1B4vczWpr3KC1F5gaO2DVJ57O3u6uztDlN6VoWgscTPlrLBZ5GpWIehWIahU4OeEFR7eZ2y2+HlP3WUPnSTHV2C4ubp5unrX4ukiqm76OrslLDA09zh+b4k+rQA+rQAtpgianhIzaEXy6AYmoww3KgPLV9n9LEDDlJ2kIg1foA/HFhvTm1WfYA/DFF3K15ozKEX87st+rQA6Ojo5OTk8PDw8PDwhxaABgAAAFJ0Uk5TAPb/hP///////////////////////////////////////////////////////////////////////8n///////////////////////+1///y62bOHmwAAAEtSURBVHicndJNS8NAEAbgeXdt6xdKQkGLIFLUgx6qFfU/iKD/VNT/oIdisRc9qBQ/KFUoVaGxTZPUXY12N9k04pzeZZ+BYRhQSuFPABqDHwNM62EDPwWQKoaAg9APX4r4AVk3J8DHpPPNhyIEU/jqzgKvZL2pIgS2Iw3eafY5/Ah0MI+23aCFVh6PZkCLL3P3tNQs1MkMiqL9jpafrOkbM1h9oBkLqFPxygzWm4VbEVaAWsIMG5eb17RW3bpImEFUpkSo/C7QACL1L7ATuR6cRcAuEy8EvM9YIJN3HgVjrLINLwOXBzL1YoCoViKeQ5e7MlECmAC6I4EQTgJgqJYx4Hy848lkGlIePe/ZHV+m2JB7LX0P+dMI2FcXdWzYpFbaqg9PYv8HRyoYVangExMZZSEYD1+TAAAAAElFTkSuQmCC";
