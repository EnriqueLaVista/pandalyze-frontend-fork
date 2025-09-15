import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";

// Función que inicializa el bloque del mapa y su generador de código.
export const initMapViewerBlock = () => {

  // Definición del bloque 
  Blockly.Blocks["map_viewer"] = {
    init: function () {
      // Estructura visual del bloque
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
      this.setTooltip("Genera un mapa con marcadores a partir de un DataFrame.");
      this.setHelpUrl("");
    },
  };

  // Definición del generador de código Python para el bloque 
  pythonGenerator["map_viewer"] = function (block) {
    // Obtenemos el código de lo que está conectado a cada entrada
    const dataframe = pythonGenerator.valueToCode(block, "DATAFRAME", pythonGenerator.ORDER_ATOMIC) || "None";
    const lat = pythonGenerator.valueToCode(block, "LAT", pythonGenerator.ORDER_ATOMIC) || "None";
    const long = pythonGenerator.valueToCode(block, "LONG", pythonGenerator.ORDER_ATOMIC) || "None";
    const title = pythonGenerator.valueToCode(block, "TITLE", pythonGenerator.ORDER_ATOMIC) || "None";

    // Construimos la llamada a la función que se enviará al backend
    const code = `generate_map(dataframe=${dataframe}, lat_col=${lat}, long_col=${long}, title_col=${title})`;
    
    // Devolvemos el código generado
    return [code, pythonGenerator.ORDER_FUNCTION_CALL];
  };
};