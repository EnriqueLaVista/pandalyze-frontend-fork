import React from "react";
import examplesData from "./examples.json";
import BlocksService from "../blocksEditor/services/BlocksService";
import {readPdlzFile}  from "../workspaceJsonUploader/PandalyzeReader"

const ExamplesDropdown = ({ loadingExampleRef, isLoading }) => {
  const handleDropdownItemClick = (exampleID) => {
    loadExampleBlocksIntoWorkspace(exampleID, examplesData[exampleID]);
  };

  const loadExampleBlocksIntoWorkspace = async (exampleID, selectedExample) => {
    if (selectedExample) {
      loadingExampleRef.current = exampleID;
      // leer y convertir el ejemplo seleccionado a File para poder leerlo.
      // type debe ser vacío por ser un .pdlz
      const response = await fetch(selectedExample.path);
      const blob = await response.blob();
      const exampleWorkspace = await readPdlzFile( new File(
        [blob], 
        selectedExample.path.split("/").pop(), 
        {type: ""}
      ));

      BlocksService.onWorkspaceLoad(exampleWorkspace);
    }
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        disabled={isLoading}
      >
        Ejemplos
      </button>
      <ul className="dropdown-menu">
        {Object.entries(examplesData).map(([id, info]) => (
          <li key={id}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => handleDropdownItemClick(id)}
            >
              {info.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamplesDropdown;
