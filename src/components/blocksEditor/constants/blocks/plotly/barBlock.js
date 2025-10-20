import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initBarBlock = () => {
  Blockly.Blocks["bar"] = {
    init: function () {
      this.appendDummyInput().appendField("plotly.bar(data_frame = ");
      this.appendValueInput("dataFrameValue").setCheck(null);
      this.appendDummyInput().appendField(", x = ");
      this.appendValueInput("xValue").setCheck(null);
      this.appendDummyInput().appendField(", y = ");
      this.appendValueInput("yValue").setCheck(null);
      this.appendDummyInput().appendField(", title = ");
      this.appendValueInput("title").setCheck(null);
      this.appendDummyInput().appendField(")");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(80);
      this.setHelpUrl("");
    },
  };

  pythonGenerator["bar"] = function (block) {
    var dataFrameBlockInput = pythonGenerator.valueToCode(
      block,
      "dataFrameValue",
      pythonGenerator.ORDER_NONE
    );
    var xBlockInput = pythonGenerator.valueToCode(
      block,
      "xValue",
      pythonGenerator.ORDER_NONE
    );
    var yBlockInput = pythonGenerator.valueToCode(
      block,
      "yValue",
      pythonGenerator.ORDER_NONE
    );
    var title = pythonGenerator.valueToCode(
      block,
      "title",
      pythonGenerator.ORDER_NONE
    );
    var lineCode = `plotly.bar(data_frame = ${dataFrameBlockInput}, x = ${xBlockInput}, y = ${yBlockInput}, title = ${title})`;

    return [lineCode, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};
