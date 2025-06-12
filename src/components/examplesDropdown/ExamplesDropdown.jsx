import React from "react";
import examplesData from "./examples.json";
import BlocksService from "../blocksEditor/services/BlocksService";

const ExamplesDropdown = ({ loadingExampleRef, isLoading }) => {
  const handleDropdownItemClick = (exampleTitle) => {
    const selectedExample = examplesData.find(
      (example) => example.title === exampleTitle
    );

    loadExampleBlocksIntoWorkspace(selectedExample);
  };

  const loadExampleBlocksIntoWorkspace = (selectedExample) => {
    if (selectedExample) {
      loadingExampleRef.current = selectedExample.id;
      BlocksService.onWorkspaceLoad(selectedExample.workspace);
    }
  };

  // TODO: cambiar la lectura de las opciones para tener varios
  // ejemplos en distintos archivos sin llenar tanto un único JSON.
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
        {examplesData.map((example) => (
          <li key={example.title}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => handleDropdownItemClick(example.title)}
            >
              {example.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamplesDropdown;
