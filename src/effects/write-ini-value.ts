import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { EffectScope } from "@crowbartools/firebot-custom-scripts-types/types/effects";
import { logger } from "@oceanity/firebot-helpers/firebot";
import { getErrorMessage } from "@oceanity/firebot-helpers/string";
import { writeFile } from "fs-extra";
import { stringify } from "ini";
import { DEFAULT_INI_FILE_PATH } from "../constants";
import {
  deleteFromIniObject,
  insertToIniObject,
  readAndParseIniFile,
} from "../utils/ini-helpers";

type WriteIniValueParams = {
  editMode: "write" | "delete";
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
          ng-show="effect.editMode == 'write'"
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
      ];
      if ($scope.effect.editMode === undefined) {
        $scope.effect.editMode = "write";
      }
    },

    optionsValidator: () => {
      return [];
    },

    onTriggerEvent: async (event) => {
      const { editMode, filePath, filePathMode, key, section, value } =
        event.effect;

      try {
        const path =
          filePathMode === "default" ? DEFAULT_INI_FILE_PATH : filePath;

        if (!path) throw new Error("No file path provided.");

        let config = await readAndParseIniFile(path);
        logger.info("Loaded config:\n", config);

        switch (editMode) {
          case "write":
            try {
              config = insertToIniObject(config, section, key, value);
            } catch (error) {
              logger.error(getErrorMessage(error), error);
              return {
                success: false,
              };
            }
            break;
          case "delete":
            try {
              config = deleteFromIniObject(config, section, key);
            } catch (error) {
              logger.error(getErrorMessage(error), error);
              return {
                success: false,
              };
            }
            break;
          default:
            logger.error("Unknown editMode");
            break;
        }

        logger.info("Updated config:\n", config);
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
