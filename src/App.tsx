import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import TicketDetail from "./pages/TicketDetail";
import AdminPortal from "./pages/AdminPortal";
import DepartmentPortal from "./pages/DepartmentPortal";
import AllTickets from "./pages/AllTickets";
import AddTicket from "./pages/AddTicket";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredCategory="admin">
                  <AdminPortal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/all-tickets" 
              element={
                <ProtectedRoute requiredCategory="admin">
                  <AllTickets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/add-ticket" 
              element={
                <ProtectedRoute requiredCategory="admin">
                  <AddTicket />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/reports" 
              element={
                <ProtectedRoute requiredCategory="admin">
                  <Reports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requiredCategory="admin">
                  <Users />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/electrical" 
              element={
                <ProtectedRoute requiredCategory="electrical">
                  <DepartmentPortal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/security" 
              element={
                <ProtectedRoute requiredCategory="security">
                  <DepartmentPortal />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/it-service" 
              element={
                <ProtectedRoute requiredCategory="it_service">
                  <DepartmentPortal />
                </ProtectedRoute>
              } 
            />
            <Route path="/ticket/:id" element={<TicketDetail />} />
            {/* Default redirect to login */}
            <Route path="/" element={<Login />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
