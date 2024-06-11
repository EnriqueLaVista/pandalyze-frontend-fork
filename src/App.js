import { useEffect, useState } from "react";
import "./App.css";
import BlocksEditor from "./components/blocksEditor/BlocksEditor";
import PythonEditor from "./components/pythonEditor/PythonEditor";
import WelcomeModal from "./components/welcomeModal/WelcomeModal";
import OutputConsole from "./components/outputConsole/OutputConsole";

function App() {
  const [frontendCode, setFrontendCode] = useState("");
  const [backendCode, setBackendCode] = useState("");
  const [backendResponse, setBackendResponse] = useState({});
  const [showInitialInstructionsAlert, setShowInitialInstructionsAlert] =
    useState(true);

  // Función para realizar la solicitud a heathCheck
  const fetchHealthCheck = async () => {
    try {
      const response = await fetch(
        "https://pandalyze-backend-prod.onrender.com/healthCheck",
        {
          timeout: 5000, // 5 segundos por si se cuelga el back
        }
      );
      if (response.ok) {
        console.log("Health Check successful");
      } else {
        console.error("Health Check failed");
      }
    } catch (error) {
      console.error("Error during Health Check:", error);
    }
  };

  // Efecto para realizar la solicitud cada 5 minutos
  useEffect(() => {
    // Realiza la primera solicitud al montar el componente
    fetchHealthCheck();

    // Establece un intervalo para realizar la solicitud cada 3 minutos (180,000 milisegundos)
    const intervalId = setInterval(fetchHealthCheck, 180000);

    // Limpia el intervalo al desmontar el componente para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  const updateCode = (frontendCode, backendCode) => {
    setFrontendCode(frontendCode);
    setBackendCode(backendCode);
  };

  const handleCloseInitialAlert = () => {
    setShowInitialInstructionsAlert(false);
  };

  const handleOpenInitialAlert = () => {
    setShowInitialInstructionsAlert(true);
  };

  return (
    <div className="app-container">
      {showInitialInstructionsAlert && (
        <WelcomeModal handleCloseInitialAlert={handleCloseInitialAlert} />
      )}
      <p className="app-entire-title">
        <button
          className="btn btn-primary tutorial-button"
          onClick={handleOpenInitialAlert}
        >
          Ver tutorial
        </button>
        <div className="title-container">
          <span className="title">Pandalyze: </span>
          <span className="subtitle">
            aprender Ciencia de Datos con programación en bloques
          </span>
        </div>
      </p>

      <div className="editors-flex-container">
        <BlocksEditor updateCode={updateCode} />
        <PythonEditor
          frontendCode={frontendCode}
          backendCode={backendCode}
          setBackendResponse={setBackendResponse}
        />
      </div>
      <OutputConsole backendResponse={backendResponse}></OutputConsole>
    </div>
  );
}

export default App;
