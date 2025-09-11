import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import BlocksService from "../../services/BlocksService";

export const initReadCsvBlock = (useFrontRef) => {
  Blockly.Blocks["read_csv"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("read_csv")
        .appendField(
          new Blockly.FieldDropdown(this.generateOptions),
          "csvOptions"
        );
      this.setColour("#CD853F");
      this.setOutput(true, null); // Permite que este bloque pueda ser conectado a otro bloque
    },

    generateOptions: function () {
      // ya no se necesita actualizar la función todo el rato. dinámicamente
      // se obtienen los resultados de BlocksService.
      return BlocksService.mapCsvs();
    },
  };

  pythonGenerator.forBlock["read_csv"] = function (block, generator) {
    var selectedKey = block.getFieldValue("csvOptions");
    var selectedValue = block.getField("csvOptions").getText();

    if (useFrontRef.current) {
      const code = `pandas.read_csv("${selectedValue}")`;
      return [code, pythonGenerator.ORDER_FUNCTION_CALL];
    } else {
      const code = `read_csv("${selectedKey}")`;
      return [code, pythonGenerator.ORDER_FUNCTION_CALL];
    }
  };
};
