import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./OutputConsoleStyles.css";

const OutputConsole = ({ backendResponse }) => {
  const [expandedConsole, setExpandedConsole] = useState(null);

  useEffect(() => {
    if (backendResponse.output || backendResponse.plots || backendResponse.type === "map") {
      const element = document.querySelector(".console, .map-container");
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [backendResponse]);

  const toggleExpand = (id) => {
    setExpandedConsole(expandedConsole === id ? null : id);
  };

  const getConsoleStyle = (id) => {
    if (expandedConsole === id) {
      return {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#fff",
        zIndex: 9999,
        overflow: "auto",
        padding: "16px",
        maxHeight: "none",
      };
    }
    return {};
  };

  const blocks = [];

  if (backendResponse.codeExecutionError) {
    blocks.push({
      id: "error",
      type: "error",
      content: (
        <div key="error" className="console" style={getConsoleStyle("error")}>
          <button
            className="btn btn-primary expand-btn"
            onClick={() => toggleExpand("error")}
          >
            {expandedConsole === "error" ? "Contraer" : "Expandir"}
          </button>
          <pre className="code-output">{backendResponse.personalizedError}</pre>
          {backendResponse.originalError && (
            <details>
              <summary>Ver información avanzada</summary>
              <pre className="code-output">{backendResponse.originalError}</pre>
            </details>
          )}
        </div>
      ),
    });
  } else if (backendResponse.type === "map") {
    blocks.push({
      id: "map",
      type: "map",
      content: (
        <div key="map" className="map-container" style={getConsoleStyle("map")}>
          <button
            className="btn btn-primary expand-btn"
            onClick={() => toggleExpand("map")}
          >
            {expandedConsole === "map" ? "Contraer" : "Expandir"}
          </button>
          <iframe
            title="Mapa Generado"
            srcDoc={backendResponse.output}
            className="map-iframe"
          />
        </div>
      ),
    });
  } else {
    // Output solo
    if (backendResponse.output && !backendResponse.plots?.length) {
      blocks.push({
        id: "output",
        type: "console",
        content: (
          <div
            key="output"
            className={`console ${backendResponse.codeEmptyWarning ? "console-warning" : ""}`}
            style={getConsoleStyle("output")}
          >
            <button
              className="btn btn-primary expand-btn"
              onClick={() => toggleExpand("output")}
            >
              {expandedConsole === "output" ? "Contraer" : "Expandir"}
            </button>
            <pre className="code-output">{backendResponse.output}</pre>
          </div>
        ),
      });
    }

    // Plots solo
    if (!backendResponse.output && backendResponse.plots?.length) {
      blocks.push({
        id: "plots",
        type: "console",
        content: (
          <div key="plots" className="console" style={getConsoleStyle("plots")}>
            <button
              className="btn btn-primary expand-btn"
              onClick={() => toggleExpand("plots")}
            >
              {expandedConsole === "plots" ? "Contraer" : "Expandir"}
            </button>
            {backendResponse.plots.map((plot, idx) => (
              <Plot key={idx} data={plot.data} layout={plot.layout} />
            ))}
          </div>
        ),
      });
    }

    // Output + plots
    if (backendResponse.output && backendResponse.plots?.length) {
      blocks.push({
        id: "output",
        type: "console",
        content: (
          <div
            key="output-mixed"
            className={`console ${backendResponse.codeEmptyWarning ? "console-warning" : ""}`}
            style={getConsoleStyle("output")}
          >
            <button
              className="btn btn-primary expand-btn"
              onClick={() => toggleExpand("output")}
            >
              {expandedConsole === "output" ? "Contraer" : "Expandir"}
            </button>
            <pre className="code-output">{backendResponse.output}</pre>
          </div>
        ),
      });
      blocks.push({
        id: "plots",
        type: "console",
        content: (
          <div key="plots-mixed" className="console" style={getConsoleStyle("plots")}>
            <button
              className="btn btn-primary expand-btn"
              onClick={() => toggleExpand("plots")}
            >
              {expandedConsole === "plots" ? "Contraer" : "Expandir"}
            </button>
            {backendResponse.plots.map((plot, idx) => (
              <Plot key={idx} data={plot.data} layout={plot.layout} />
            ))}
          </div>
        ),
      });
    }

    // Vacío
    if (!backendResponse.output && !backendResponse.plots?.length) {
      blocks.push({
        id: "empty",
        type: "console",
        content: (
          <div key="empty" className="console" style={getConsoleStyle("empty")}>
            <button
              className="btn btn-primary expand-btn"
              onClick={() => toggleExpand("empty")}
            >
              {expandedConsole === "empty" ? "Contraer" : "Expandir"}
            </button>
            <h5>Consola</h5>
          </div>
        ),
      });
    }
  }

  return <div className="consoles-container">{blocks.map((b) => b.content)}</div>;
};

export default OutputConsole;
