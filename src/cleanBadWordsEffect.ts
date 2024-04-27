import { RunRequest } from "@crowbartools/firebot-custom-scripts-types";
import { Effects } from "@crowbartools/firebot-custom-scripts-types/types/effects";
var Filter = require("bad-words"),
  filter = new Filter();

interface ScriptParams extends Record<string, unknown> {}

const optionsTemplate = `
      <eos-container header="Text">
          <textarea ng-model="effect.text" class="form-control" name="text" placeholder="Enter text" rows="4" cols="100" replace-variables menu-position="under"></textarea>
      </eos-container>
      <eos-container header="Custom Variable">
        <div class="input-group" style="margin-top: 4px">
          <label class="input-group-addon">Custom Variable Name</label>
          <textarea ng-model="effect.variableName" class="form-control" name="text" placeholder="Name your custom variable" rows="1" cols="100" replace-variables menu-position="under"></textarea>
        </div>
      </eos-container>
`;

export const buildCleanBadWordsEffect = (
  runRequest: RunRequest<ScriptParams>
) => {
  const logger = runRequest.modules.logger;
  return {
    definition: {
      id: "codehdn:clean-bad-words",
      name: "Clean Bad Words",
      description:
        "Passes a user entered message through a bad word filter and returns the cleaned message to a Custom Variable.",
      icon: "fad fa-hands-wash",
      categories: ["chat based"] as Effects.EffectCategory[],
      triggers: {
        command: true,
        event: true,
        manual: true,
      },
    },
    optionsTemplate,
    optionsController: ($scope) => {
      if (!$scope.effect.text) {
        $scope.effect.text = "";
      }
      if (!$scope.effect.variableName) {
        $scope.effect.variableName = "";
      }
    },
    optionsValidator: (effect) => {
      const errors = [];
      if (!effect.text) {
        errors.push("Text to clean is required");
      }
      return errors;
    },
    onTriggerEvent: async (event) => {
      const effect = event.effect;
      try {
        const cleanedText = filter.clean(effect.text);
        runRequest.modules.customVariableManager.addCustomVariable(
          effect.variableName,
          cleanedText
        );
        return true;
      } catch (error) {
        logger.error(error);
        return false;
      }
    },
  };
};
