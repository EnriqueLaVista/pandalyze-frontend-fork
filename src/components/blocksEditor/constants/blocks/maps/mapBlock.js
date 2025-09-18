import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

export const initMapViewerBlock = () => {

  Blockly.Blocks["map_viewer"] = {
    init: function () {
      this.appendDummyInput().appendField("map.show(data_frame = ");
      this.appendValueInput("DATAFRAME").setCheck(null);
      this.appendDummyInput().appendField(", lat = ");
      this.appendValueInput("LAT").setCheck(null);
      this.appendDummyInput().appendField(", long = ");
      this.appendValueInput("LONG").setCheck(null);
      this.appendDummyInput().appendField(", title = ");
      this.appendValueInput("TITLE").setCheck(null);
      this.appendDummyInput().appendField(")");
      
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(230);
      this.setTooltip("Genera un mapa con marcadores. El color se basa en la columna del título.");
    },
  };

  pythonGenerator["map_viewer"] = function (block) {
    const dataframe = pythonGenerator.valueToCode(block, "DATAFRAME", pythonGenerator.ORDER_ATOMIC) || "None";
    const lat = pythonGenerator.valueToCode(block, "LAT", pythonGenerator.ORDER_ATOMIC) || "None";
    const long = pythonGenerator.valueToCode(block, "LONG", pythonGenerator.ORDER_ATOMIC) || "None";
    const title = pythonGenerator.valueToCode(block, "TITLE", pythonGenerator.ORDER_ATOMIC) || "None";
    
    const code = `generate_map(dataframe=${dataframe}, lat_col=${lat}, long_col=${long}, title_col=${title})`;
    
    return [code, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};