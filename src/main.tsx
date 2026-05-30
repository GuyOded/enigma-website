import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/app";
import { init } from "./config/app-config";

init();

const root = document.getElementById("root");
if (root != null) {
    createRoot(root).render(
        <StrictMode>
            <App></App>
        </StrictMode>,
    );
} else {
    console.error("Unable to find root element");
}
