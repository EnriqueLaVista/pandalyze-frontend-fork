import Blockly from "blockly";
import { toolbox } from "../constants/toolbox";
import { initHeadBlock } from "../constants/blocks/headBlock";
import { initInfoBlock } from "../constants/blocks/infoBlock";
import { initColumnBlock } from "../constants/blocks/columnBlock";
import { initShapeBlock } from "../constants/blocks/shapeBlock";
import { initDataTypeBlock } from "../constants/blocks/dataTypeBlock";
import { initPrintBlock } from "../constants/blocks/printBlock";
import { initReadCsvBlock } from "../constants/blocks/readCsvBlock";
import { initVariablesBlocks } from "../constants/blocks/variablesBlock";
import { initPropertyBlock } from "../constants/blocks/propertyBlock";
import { initComparisonBlock } from "../constants/blocks/comparisonBlock";
import { initDescribeBlock } from "../constants/blocks/describeBlock";
import { initPrimitiveBlocks } from "../constants/blocks/primitiveBlocks";
import { initSortBlock } from "../constants/blocks/sortBlock";
import { initValuesBlock } from "../constants/blocks/valueBlock";
import { initIndexBlock } from "../constants/blocks/indexBlock";
import { initMeanBlock } from "../constants/blocks/pandasFilter/meanBlock";
import { initMaxBlock } from "../constants/blocks/pandasFilter/maxBlock";
import { initMinBlock } from "../constants/blocks/pandasFilter/minBlock";
import { initCountBlock } from "../constants/blocks/pandasFilter/countBlock";
import { initNullSumBlock } from "../constants/blocks/pandasFilter/nullColumnCounterBlock";
import { initUniqueBlock } from "../constants/blocks/pandasFilter/uniqueBlock";
import { initGroupByBlock } from "../constants/blocks/pandasFilter/groupbyBlock";
import { initSumBlock } from "../constants/blocks/pandasFilter/sumBlock";
import { initValueCountsBlock } from "../constants/blocks/pandasFilter/valueCountsBlocks";
import { initLineBlock } from "../constants/blocks/plotly/lineBlock";
import { initScatterBlock } from "../constants/blocks/plotly/scatterBlock";
import { initBarBlock } from "../constants/blocks/plotly/barBlock";
import { initPieBlock } from "../constants/blocks/plotly/pieBlock";
import { initShowInConsoleBlock } from "../constants/blocks/plotly/showInConsoleBlock";
import defaultBlocks from "../constants/blocks/defaultBlocks.json";

const BlocksService = {
  variables: [],
  csvsData: [],

  initBlocks(useFrontRef, loadingExampleRef) {
    initPrintBlock();
    initReadCsvBlock(useFrontRef);
    initHeadBlock();
    initInfoBlock();
    initColumnBlock();
    initShapeBlock();
    initDataTypeBlock();
    initDescribeBlock();
    initVariablesBlocks();
    initPropertyBlock(this.csvsData, loadingExampleRef);
    initLineBlock();
    initBarBlock();
    initScatterBlock();
    initPieBlock();
    initMeanBlock();
    initMaxBlock();
    initMinBlock();
    initCountBlock();
    initNullSumBlock();
    initUniqueBlock();
    initSortBlock();
    initComparisonBlock();
    initPrimitiveBlocks();
    initShowInConsoleBlock(useFrontRef);
    initGroupByBlock();
    initSumBlock();
    initValueCountsBlock();
    initValuesBlock();
    initIndexBlock();
  },

  // Se dispara cuando el usuario guarda un Csv
  onCsvUpload(csvData) {
    this.csvsData.push(csvData);

    const readCsvBlockDropdownOptions = this.csvsData.map((csvData) => [
      csvData.filename,
      `${csvData.id}`,
    ]);

    Blockly.Blocks["read_csv"].generateOptions = function () {
      return readCsvBlockDropdownOptions;
    };

    this.refreshWorkspace();
  },

  onRefreshFlyout() {
    if (this.variables.length === 0) {
      return [
        {
          kind: "button",
          text: "Crear variable",
          callbackKey: "createVariableCallbackKey",
        },
      ];
    } else {
      return [
        {
          kind: "button",
          text: "Crear variable",
          callbackKey: "createVariableCallbackKey",
        },
        {
          kind: "block",
          type: "variables_get",
        },
        {
          kind: "block",
          type: "variables_set",
        },
      ];
    }
  },

  loadWorkspace(workspace) {
    // Guardar el workspace para cargarlo de nuevo en caso de error.
    const backupWorkspace = this.getCurrentWorkspace();

    try {
      // sobreescribir variables.
      // puede fallar si se modificó el contenido.
      this.variables = workspace.variables;
      this.updateVariablesDrowdown();

      // sobreescribir el workspace de blockly.
      // puede fallar si se modificó el contenido. por ejemplo intentando poner
      // un nombre de un bloque que no existe.
      Blockly.serialization.workspaces.load(
        workspace.blocks, 
        Blockly.getMainWorkspace()
      );

      // Refrescar para evitar errores en los datos cargados
      BlocksService.refreshWorkspace();

      // no falló nada.
      return '';
    } catch(e) {
      // falló cargar el archivo leído.
      // TODO: ver si esta recursión genera problemas. creería que no(?)
      this.loadWorkspace(backupWorkspace);
      return 'Hay un error en el archivo por lo que no puede ser cargado.';
    };
  },

  updateVariablesDrowdown() {
    // Actualizar las opciones de los bloques get y set
    Blockly.Blocks["variables_get"].generateOptions = function () {
      return BlocksService.variables.map((variable, index) => [
        variable,
        index.toString(),
      ]);
    };

    Blockly.Blocks["variables_set"].generateOptions = function () {
      return BlocksService.variables.map((variable, index) => [
        variable,
        index.toString(),
      ]);
    };
  },

  getCurrentWorkspace() {
    // Devolver el workspace actual.

    const getCsvFilesInUse = () => {
      // Obtener los nombres de los archivos csv que están seleccionados en los
      // bloques csv.
      // TODO: como se mantiene el id de los csv quizá esta solución no es la 
      // correcta. Pero todo depende de qué es el id de los csv y cómo se genera.
      // Parece que los id se usan para elegir cual csv usar en los bloques de csv
      // asi que se tienen que mantener. Pero no sé si son únicos para cada csv aún.
      const csvNames = Blockly.getMainWorkspace().getBlocksByType("read_csv").map(
        b => b.getField("csvOptions").getText()
      );
      // Retornar toda la info de los csv que se están usando.
      // Se rompe si se repite??? no creo pero considerable.
      return this.csvsData.filter(c => csvNames.includes(c.filename))
    };

    return {
      variables: this.variables,
      csvsData: getCsvFilesInUse(),
      blocks: Blockly.serialization.workspaces.save(Blockly.getMainWorkspace())
    };
  },

  onWorkspaceLoad(workspace) {
    // Se ejecuta cuando se quiere cargar un workspace. 
    // Verifica que no falten CSV y carga las variables junto al workspace de Blockly.

    // verificar que los csv del workspace cargado esten cargados.
    // (true si newCsvsData está "incluido" en this.csvsData, false sino).
    const missingCsvs = workspace.csvsData.filter(
      c1 => !this.csvsData.some(
        c2 => JSON.stringify(c1) == JSON.stringify(c2)
      )
    );

    // TODO: de esta forma el orden en que se cargan los csv importa? como se usa el 
    // id para elegir el csv creo que no interesa el orden.
    // TODO: implementar una solución donde el orden de carga no importe? 
    // (aunque sí importa para otras cosas asi que podría ser mejor dejarlo así 
    // y aclarar que importa en un cartel)
    if (missingCsvs.length == 0) {
      const response = this.loadWorkspace(workspace);
      return response;
    } else {
      // faltan cargar archivos csv usados en la solución.
      const missingNames = missingCsvs.map(c => c.filename).join(", ");
      return `Asegúrese de cargar los archivos CSV que usó anteriormente (${missingNames}) e intente nuevamente.`;
    };
  },

  onCreateVariableClick(button) {
    const variableName = prompt("Nombra tu variable:");
    if (
      variableName !== null &&
      variableName?.trim() !== "" &&
      !this.variables?.includes(variableName)
    ) {
      this.variables.push(variableName);

      this.updateVariablesDrowdown();
      
      if (this.variables.length === 1) {
        // Actualizar la flyout en el workspace
        const flyout = Blockly.getMainWorkspace().getFlyout();
        flyout.hide();
        flyout.show(toolbox);
      };
      
      // TODO: creo que actualizar así causa que los bloques pierdan sus 
      // valores si usan selectbox que dependan de otro bloque, como los
      // de selección de columnas.
      this.refreshWorkspace();
      return "";
    } else if (variableName?.trim() === "") {
      return "El nombre de la variable no puede estar vacío.";
    } else if (this.variables?.includes(variableName)) {
      return "La variable ya existe.";
    }
  },

  refreshWorkspace() {
    const workspace = Blockly.getMainWorkspace();
    const blocksXML = Blockly.Xml.workspaceToDom(workspace);
    workspace.clear();
    Blockly.Xml.domToWorkspace(blocksXML, workspace);
  },
};

export default BlocksService;
