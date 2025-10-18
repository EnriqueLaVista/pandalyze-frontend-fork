import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { findCsvId } from "../propertyBlock";
import BlocksService from '../../../services/BlocksService';

export const initMapViewerBlock = () => {
  Blockly.Blocks["map_viewer"] = {
    init: function () {
      this.appendValueInput("DATAFRAME").setCheck(null).appendField("mostrar mapa de:");
      this.appendValueInput("LAT").setCheck(null).appendField("usar lat:");
      this.appendValueInput("LONG").setCheck(null).appendField("usar long:");
      this.appendValueInput("CATEGORY").setCheck(null).appendField("por categoría:");
      this.setInputsInline(false);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Genera un mapa a partir de un DataFrame con marcadores basados en las columnas proporcionadas.");
    },
  };


pythonGenerator["map_viewer"] = function (block) {
  let dataframeCode =
    pythonGenerator.valueToCode(block, "DATAFRAME", pythonGenerator.ORDER_ATOMIC) || "None";

  // Detectar CSV asociado
  const csvId = findCsvId(block.getInputTargetBlock("DATAFRAME"));
  if (csvId) {
    // Buscar el nombre real del archivo a partir del id
    const csvInfo = BlocksService.csvsData.find(
      (csv) => csv.id.toString() === csvId.toString()
    );
    const csvName = csvInfo ? csvInfo.name : csvId; // fallback por si no se encuentra
    dataframeCode = `pd.read_csv("${csvName}")`;
  }

  const lat =
    pythonGenerator.valueToCode(block, "LAT", pythonGenerator.ORDER_ATOMIC)?.replace(/['"]/g, "") ||
    "None";
  const long =
    pythonGenerator.valueToCode(block, "LONG", pythonGenerator.ORDER_ATOMIC)?.replace(/['"]/g, "") ||
    "None";
  const category =
    pythonGenerator.valueToCode(block, "CATEGORY", pythonGenerator.ORDER_ATOMIC)?.replace(/['"]/g, "") ||
    "None";

  const code = `generate_map(dataframe=${dataframeCode}, lat_col='${lat}', long_col='${long}', category_col='${category}')\n`;
  return code;
};

};
