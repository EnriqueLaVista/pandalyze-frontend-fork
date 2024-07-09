import React, { useEffect, useRef, useState } from "react";
import Blockly from "blockly";
import "./styles.css";
import { pythonGenerator } from "blockly/python";
import CsvUploader from "../csvUploader/CsvUploader";
import BlockInfoModal from "../blockInfoModal/BlockInfoModal";
import BlocksService from "./services/BlocksService";
import { toolbox } from "./constants/toolbox";
import { blocksInfo } from "../blockInfoModal/blocksInfo";
import defaultBlocks from "./constants/blocks/defaultBlocks.json";
import ErrorAlert from "../alerts/errorAlert/ErrorAlert";
import SuccessAlert from "../alerts/successAlert/SuccessAlert";
import WarningAlert from "../alerts/warningAlert/WarningAlert";
import ExamplesDropdown from "../examplesDropdown/ExamplesDropdown";
import WorkspaceJsonUploader from "../workspaceJsonUploader/WorkspaceJsonUploader";

const BlocksEditor = ({ updateCode, isLoading, setIsLoading }) => {
  const useFrontRef = useRef(true);
  const loadingExampleRef = useRef(undefined);
  const [openBlockInfoModal, setOpenBlockInfoModal] = useState(false);
  const [block, setBlock] = useState(null);
  const mouseTrackerRef = useRef({ x: null, y: null });
  const [mouseClickPosition, setMouseClickPosition] = useState({
    x: null,
    y: null,
  });
  const [errorAlertText, setErrorAlertText] = useState("");
  const [successAlertText, setSuccessAlertText] = useState("");
  const [warningAlertText, setWarningAlertText] = useState("");

  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    mouseTrackerRef.current = { x: mouseX, y: mouseY };
  };

  useEffect(() => {
    const workspace = Blockly.inject("blocklyDiv", {
      toolbox: toolbox,
      zoom: {
        controls: true,
      },
    });

    //TODO: falta hacer el remove del event en algun lado por ahí
    document.addEventListener("mousemove", handleMouseMove);

    BlocksService.initBlocks(useFrontRef, loadingExampleRef);

    workspace.registerButtonCallback(
      "createVariableCallbackKey",
      handleCreateVariableClick
    );

    workspace.registerToolboxCategoryCallback(
      "VariablesCategory",
      BlocksService.onRefreshFlyout.bind(BlocksService)
    );

    workspace.addChangeListener(function (event) {
      onBlocksChange(event);
      if (event.type === "click" && event.targetType === "block") {
        var clickedBlockId = event.blockId; // Recupero el ID del bloque sobre el que se hizo clic
        var clickedBlock = workspace.getBlockById(clickedBlockId); // Recupero más información sobre el bloque que se clickeó
        // A partir del type del bloque obtengo la información a mostrar en el modal
        const block = blocksInfo.find(
          (block) => block.blockType === clickedBlock.type
        );
        if (block) {
          setOpenBlockInfoModal((prev) => !prev);
          setBlock(block);

          const workspaceDiv = document.getElementById("blocklyDiv");
          const workspaceRect = workspaceDiv.getBoundingClientRect();

          const relativeX = mouseTrackerRef.current.x - workspaceRect.left;
          const relativeY = mouseTrackerRef.current.y - workspaceRect.top;

          // Seteo la posición del mouse para saber donde abrir el modal
          setMouseClickPosition({ x: relativeX, y: relativeY });
        }
      } else if (event.targetType !== "block") {
        setOpenBlockInfoModal(false);
      }
    });

    //TODO: Hace falta tener esto si tenemos los ejemplos?
    Blockly.serialization.workspaces.load(defaultBlocks, workspace);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateVariableClick = () => {
    const result = BlocksService.onCreateVariableClick();
    if (result && result !== "") {
      setErrorAlertText(result);
      setTimeout(() => {
        setErrorAlertText("");
      }, 3000);
    } else if (result !== undefined) {
      setSuccessAlertText(
        "La variable se creó correctamente. Selecciónela desde el 'set/get'."
      );
      setTimeout(() => {
        setSuccessAlertText("");
      }, 3000);
      setErrorAlertText("");
      setWarningAlertText("");
    }
  };

  const onBlocksChange = (event) => {
    const workspace = Blockly.getMainWorkspace();

    useFrontRef.current = true;
    const frontendCode = pythonGenerator.workspaceToCode(workspace);

    useFrontRef.current = false;
    const backendCode = pythonGenerator.workspaceToCode(workspace);

    updateCode(frontendCode, backendCode);
  };

  return (
    <div className="blocks-editor-container">
      <div className="workspace-buttons-container">
        <CsvUploader isLoading={isLoading} setIsLoading={setIsLoading} />
        <ExamplesDropdown
          loadingExampleRef={loadingExampleRef}
          isLoading={isLoading}
        />
        <WorkspaceJsonUploader />
      </div>
      <div id="blocklyDiv" style={{ height: "400px", width: "100%" }}></div>
      {openBlockInfoModal && (
        <BlockInfoModal {...block} mouseClickPosition={mouseClickPosition} />
      )}
      {errorAlertText && errorAlertText !== "" && (
        <ErrorAlert errorAlertText={errorAlertText} />
      )}
      {successAlertText && successAlertText !== "" && (
        <SuccessAlert successAlertText={successAlertText} />
      )}
      {warningAlertText && warningAlertText !== "" && (
        <WarningAlert warningAlertText={warningAlertText} />
      )}
    </div>
  );
};

export default BlocksEditor;
