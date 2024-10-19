import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider"
import RouteProvider from "@/middleware";
import { TooltipProvider } from "@/components/ui/tooltip"
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <RouteProvider>
            <TooltipProvider delayDuration={0}>
              <App />
            </TooltipProvider>
          </RouteProvider>
        </Router>
    </ThemeProvider>
  </StrictMode>
);
