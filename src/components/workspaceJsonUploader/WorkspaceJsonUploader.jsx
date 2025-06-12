import React, { useEffect, useState } from "react";
import Blockly from "blockly";
import ErrorAlert from "../alerts/errorAlert/ErrorAlert";
import SuccessAlert from "../alerts/successAlert/SuccessAlert";
import WarningAlert from "../alerts/warningAlert/WarningAlert";
import BlocksService from "../blocksEditor/services/BlocksService";
import { savePdlzFile, readPdlzFile, isValidPdlzFile } from './PandalyzeReader.js';

const WorkspaceJsonUploader = ({ isLoading, setIsLoading }) => {
  const [pdlzFile, setPdlzFile] = useState(null);
  const [errorAlertText, setErrorAlertText] = useState("");
  const [successAlertText, setSuccessAlertText] = useState("");
  const [warningAlertText, setWarningAlertText] = useState("");

  const clearWorkspace = () => {
    // TODO: hacer que se limpie la consola cuando se limpia el workspace.
    // Está bien que esté esto acá ahora? Antes era la única función pero ahora
    // este elemento es para guardar/cargar
    Blockly.getMainWorkspace().clear();
  };

  // TODO: refactorizar los mensajes para no repetir código.
  const setSuccessMessage = (message) => {
    setWarningAlertText("");
    setSuccessAlertText(message);
    setErrorAlertText("");

    setTimeout(() => {
      setSuccessAlertText("");
    }, 3000);
  };

  const setWarningMessage = (message) => {
    setWarningAlertText(message);
    setSuccessAlertText("");
    setErrorAlertText("");

    setTimeout(() => {
      setWarningAlertText("");
    }, 3000);
  };

  const setErrorMessage = (message) => {
    setWarningAlertText("");
    setSuccessAlertText("");
    setErrorAlertText(message);

    setTimeout(() => {
      setErrorAlertText("");
    }, 3000);
  };

  const exportWorkspaceToJson = () => {
    // se ejecuta cuando se apreta 'guardar bloques'
    setIsLoading(true);
    
    savePdlzFile(BlocksService.getCurrentWorkspace());

    setIsLoading(false);
  };

  const handleFileChange = (event) => {
    // se ejecuta cuando se apreta 'cargar bloques'.
    const file = event.target.files[0];
    if (isValidPdlzFile(file)) {
      setPdlzFile(file);
    } else {
      setWarningMessage("Por favor, seleccione un archivo Pandalyze (.pdlz).");

      setPdlzFile(null);
    }
  };

  const handleSave = async () => {
    // se ejecuta cuando se apreta el botón de 'confrimar carga de bloques'.

    setIsLoading(true);

    const responsePdlz = await readPdlzFile(pdlzFile);

    if (typeof responsePdlz !== 'string') {
      const response = BlocksService.onWorkspaceLoad(responsePdlz);

      if (response == '') {
        // No falló nada.
        setSuccessMessage("Archivo cargado correctamente.");
        } else {
          // Falló cargar el archivo leído.
          setWarningMessage(response);
        };
    } else {
      // Falló leer el archivo elegido.
      setErrorMessage(responsePdlz);
    };

    setPdlzFile(null);
    setIsLoading(false);
  };

  return (
    <>
      <button className="btn btn-danger" type="button" onClick={clearWorkspace}>
        Eliminar bloques
      </button>
    
      {/* Guardar Bloques */}
      <button
        className="btn btn-primary"
        type="button"
        onClick={exportWorkspaceToJson}
      >
        Guardar Bloques
      </button>

      {/* Cargar Bloques */}
      <label
        htmlFor="filesPdlz"
        className={`btn btn-primary ${isLoading ? "disabled" : ""}`}
      >
        Cargar Bloques
      </label>
      <input
        id="filesPdlz"
        accept=".pdlz"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {pdlzFile?.name && (
        <div className="margin-right margin-left overflow-ellipsis">
          {pdlzFile.name}
        </div>
      )}
      {pdlzFile && (
        <button
          disabled={isLoading}
          className="btn btn-success margin-right"
          onClick={handleSave}
        >
          Confirmar carga de Bloques
        </button>
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
      {isLoading && (
        <div
          className="spinner-border text-secondary spinner-style mobile-spinner"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </>
  );
};

export default WorkspaceJsonUploader;
