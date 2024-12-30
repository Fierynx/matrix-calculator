import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Instructions from "./pages/Instructions";
import Diagonalize from "./pages/Diagonalize";
import LUDecomposition from "./pages/LUDecomposition";
import PowerMethod from "./pages/PowerMethod";
import SingularValueDecomposition from "./pages/SingularValueDecomposition";
import ToastProvider from "./components/general/Toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Instructions />,
      },
      {
        path: "instructions",
        element: <Instructions />,
      },
      {
        path: "diagonalize",
        element: <Diagonalize />,
      },
      {
        path: "lu-decomposition",
        element: <LUDecomposition />,
      },
      {
        path: "power-method",
        element: <PowerMethod />,
      },
      {
        path: "singular-value-decomposition",
        element: <SingularValueDecomposition />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </QueryClientProvider>
  );
}
