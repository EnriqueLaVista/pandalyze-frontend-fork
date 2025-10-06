import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initColumnNameBlock = () => {
  Blockly.Blocks["get_column_name"] = {
    init: function () {
      this.appendValueInput("COLUMN_SERIES").setCheck(null);
      this.appendDummyInput().appendField(".name");
      this.setInputsInline(true);
      this.setOutput(true, "String");
      this.setColour("#CD853F");
      this.setTooltip("Obtiene el nombre de una columna como texto.");
      this.setHelpUrl("");
    },
  };

  pythonGenerator.forBlock["get_column_name"] = function (block) {
    const columnSeriesCode =
      pythonGenerator.valueToCode(block, "COLUMN_SERIES", pythonGenerator.ORDER_NONE) || "";

    const match = columnSeriesCode.match(/\["([^"]+)"\]/);
    const columnName = match ? match[1] : columnSeriesCode;

    return [columnName, pythonGenerator.ORDER_ATOMIC];
  };
};
