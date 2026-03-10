
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  // La sesion del estudiante dura solo mientras no se recargue la pagina.
  // Al hacer F5, se volvera a solicitar el nombre en la pantalla de bienvenida.
  localStorage.removeItem("studentName");

  createRoot(document.getElementById("root")!).render(<App />);
  
