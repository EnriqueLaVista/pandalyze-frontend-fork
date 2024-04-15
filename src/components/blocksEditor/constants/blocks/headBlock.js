import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initHeadBlock = () => {
  Blockly.Blocks["head"] = {
    init: function () {
      this.appendDummyInput().appendField("head(");
      this.appendDummyInput().appendField(
        new Blockly.FieldTextInput("", this.validateInput), // Default value es ""
        "N"
      );
      this.appendDummyInput().appendField(")");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(260);
      this.setTooltip(
        "Muestra las primeras filas de un DataFrame. Por defecto las primeras 5."
      );
      this.setHelpUrl("");
    },

    validateInput: function (newValue) {
      // Acepta el valor si es un número natural mayor que 0
      if (/^\d+$/.test(newValue) && parseInt(newValue) > 0) {
        return newValue;
      } else {
        return "";
      }
    },
  };

  pythonGenerator["head"] = function (block) {
    var blockInput = block.getFieldValue("N");
    var headCode = blockInput ? `head(${blockInput})` : "head()";
    return [headCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
