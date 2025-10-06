import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import "./OutputConsoleStyles.css";

const OutputConsole = ({ backendResponse }) => {
  useEffect(() => {
    if (backendResponse.output || backendResponse.plots || backendResponse.type === 'map') {
      const element = document.querySelector(".console, .map-container");
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [backendResponse]);

  if (Object.keys(backendResponse).length === 0) {
    return (
      <div className="consoles-container">
        <div className="console">
          <h5>Consola</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="consoles-container">
      {backendResponse.codeExecutionError && (
        <div className="console console-error">
          <pre className="code-output">{backendResponse.personalizedError}</pre>
          {backendResponse.originalError && (
            <details>
              <summary>Ver información avanzada</summary>
              <pre className="code-output">{backendResponse.originalError}</pre>
            </details>
          )}
        </div>
      )}

      {backendResponse.type === 'map' && !backendResponse.codeExecutionError && (
          <div className="map-container">
              <iframe
                title="Mapa Generado"
                srcDoc={backendResponse.output}
                className="map-iframe"
              />
          </div>
      )}

      {backendResponse.type !== 'map' && !backendResponse.codeExecutionError && (
        <>
          {backendResponse.output && !backendResponse.plots?.length && (
            <div className={`console ${backendResponse.codeEmptyWarning ? "console-warning" : ""}`}>
              <pre className="code-output">{backendResponse.output}</pre>
            </div>
          )}

          {!backendResponse.output && backendResponse.plots?.length > 0 && (
            <div className="console">
              {backendResponse.plots.map((plot, index) => (
                <Plot key={index} data={plot.data} layout={plot.layout} />
              ))}
            </div>
          )}

          {backendResponse.output && backendResponse.plots?.length > 0 && (
            <>
              <div className="console">
                <pre className="code-output">{backendResponse.output}</pre>
              </div>
              <div className="console">
                {backendResponse.plots.map((plot, index) => (
                  <Plot key={index} data={plot.data} layout={plot.layout} />
                ))}
              </div>
            </>
          )}

          {!backendResponse.output && !backendResponse.plots?.length && (
              <div className="console">
                <h5>Consola</h5>
              </div>
            )
          }
        </>
      )}
    </div>
  );
};

export default OutputConsole;