import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { OptimizationPage } from "./pages/OptimizationPage";
import { HistoryPage } from "./pages/HistoryPage";
import { SettingsPage } from "./pages/SettingsPage";
import { DashboardLayout } from "./components/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "optimize", Component: OptimizationPage },
      { path: "history", Component: HistoryPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);