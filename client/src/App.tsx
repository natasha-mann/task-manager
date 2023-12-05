import React from "react";
import * as ReactDom from "react-dom/client";

function App() {
  return <div>Task Manager</div>;
}

ReactDom.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
