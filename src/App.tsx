import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";


import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import DocumentManagement from "./pages/documents/DocumentManagement";
import UserManagement from "./pages/users/UserManagement";
import QASection from "./pages/qa/QASection";
import NotFound from "./pages/NotFound";


import ProtectedRoute from "./components/auth/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster position="top-right" />
        <Routes>
         
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<DocumentManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/qa" element={<QASection />} />
          </Route>

         
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
