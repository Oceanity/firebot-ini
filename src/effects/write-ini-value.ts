import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { EffectScope } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { logger } from "@oceanity/firebot-helpers/firebot";
import { getErrorMessage } from "@oceanity/firebot-helpers/string";
import { ensureFile, exists, writeFile } from "fs-extra";
import { stringify } from "ini";
import { resolve } from "path";
import { DEFAULT_INI_FILE_PATH } from "../constants";
import {
  appendToIniObjectArray,
  deleteFromIniObject,
  insertToIniObject,
  readAndParseIniFile,
  removeFromIniObjectArray,
} from "../utils/ini-helpers";

type WriteIniValueParams = {
  editMode: "write" | "delete" | "append" | "remove";
  filePathMode: "default" | "fileSelector" | "filePath";
  filePath?: string;
  key: string;
  section: string;
  value: string;
};

export const WriteIniValueEffectType: Firebot.EffectType<WriteIniValueParams> =
  {
    definition: {
      id: "write-ini-value",
      name: "Write to INI File",
      description: "Writes a value to an INI file.",
      icon: "fad fa-file-edit",
      categories: ["integrations"],
    },
    optionsTemplate: `
      <eos-container header="File Location">
        <div class="form-group">
          <firebot-radio-cards
            options="pathModeOptions"
            ng-model="effect.filePathMode"
            id="pathModeOptions"
            name="pathModeOptions"
            grid-columns="2"
          ></firebot-radio-cards>
        </div>
        <div ng-show="effect.filePathMode == 'fileSelector'" class="form-group">
          <file-chooser
            model="effect.filePath"
            options="{ filters: [ {name: 'INI', extensions: ['ini']} ]}"
          ></file-chooser>
        </div>
      </eos-container>
      <eos-container header="Mode">
        <div class="form-group">
          <firebot-radio-cards
            options="editModeOptions"
            ng-model="effect.editMode"
            id="editModeOptions"
            name="editModeOptions"
            grid-columns="2"
          ></firebot-radio-cards>
        </div>
      </eos-container>
      <eos-container header="Data">
        <firebot-input
          model="effect.section"
          input-title="Section"
          placeholder-text="Section"
          menu-position="under"
          style="margin-bottom: 20px" />
        <firebot-input
          model="effect.key"
          input-title="Key"
          placeholder-text="Key"
          menu-position="under"
          style="margin-bottom: 20px" />
        <firebot-input
          ng-show="effect.editMode != 'delete'"
          model="effect.value"
          input-title="Value"
          placeholder-text="Value"
          menu-position="under"
          style="margin-bottom: 20px" />
      </eos-container>
    `,
    optionsController: ($scope: EffectScope<WriteIniValueParams>) => {
      $scope.pathModeOptions = [
        {
          value: "default",
          label: "Default",
          description: "Edit a value in the default INI file.",
          iconClass: "fa-house",
        },
        {
          value: "fileSelector",
          label: "File Selector",
          description: "Specify an INI file to edit a value in.",
          iconClass: "fa-file",
        },
      ];
      if ($scope.effect.filePathMode === undefined) {
        $scope.effect.filePathMode = "default";
      }

      $scope.editModeOptions = [
        {
          value: "write",
          label: "Write",
          description: "Write a value to the INI file.",
          iconClass: "fa-pencil",
        },
        {
          value: "delete",
          label: "Delete",
          description: "Delete a value from the INI file.",
          iconClass: "fa-eraser",
        },
        {
          value: "append",
          label: "Append to Array",
          description: "Append a value to an array in the INI file.",
          iconClass: "fa-plus",
        },
        {
          value: "remove",
          label: "Remove from Array",
          description: "Remove a value from an array in the INI file.",
          iconClass: "fa-minus",
        },
      ];
      if ($scope.effect.editMode === undefined) {
        $scope.effect.editMode = "write";
      }
    },

    optionsValidator: (effect) => {
      const errors: string[] = [];
      if (!effect.section) errors.push("Section is required.");
      if (!effect.key) errors.push("Key is required.");
      if (effect.editMode != "delete" && !effect.value)
        errors.push("Value is required.");
      return errors;
    },

    onTriggerEvent: async (event) => {
      try {
        let { editMode, filePath, filePathMode, key, section, value } =
          event.effect;

        const path =
          filePathMode === "default"
            ? DEFAULT_INI_FILE_PATH
            : resolve(__dirname, "../", filePath);

        if (!path) throw new Error("No file path provided.");

        if (!(await exists(path))) {
          await ensureFile(path);
          logger.info(`Creating INI file at ${path}`);
        }

        let config = await readAndParseIniFile(path);

        const invalidKeyChars = new RegExp("[\\[\\]:=]", "ig");
        if (key && invalidKeyChars.test(key))
          key = key.replace(invalidKeyChars, "_");

        switch (editMode) {
          case "write":
            config = insertToIniObject(config, section, key, value);
            break;
          case "delete":
            config = deleteFromIniObject(config, section, key);
            break;
          case "append":
            config = appendToIniObjectArray(config, section, key, value);
            break;
          case "remove":
            config = removeFromIniObjectArray(config, section, key, value);
            break;
          default:
            throw new Error("Invalid edit mode.");
        }

        await writeFile(path, stringify(config));

        return {
          success: true,
        };
      } catch (error) {
        logger.error(getErrorMessage(error), error);
        return {
          success: false,
        };
      }
    },
  };
