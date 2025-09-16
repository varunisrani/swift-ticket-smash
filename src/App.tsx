import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { ProtectedRoute, AccessDenied } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Submit from "./pages/Submit";
import TicketDetail from "./pages/TicketDetail";
import CustomerPortal from "./pages/CustomerPortal";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboardPage from "./pages/ManagerDashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Dashboard Layout */}
            <Route
              path="/"
              element={
                <DashboardLayout>
                  <Index />
                </DashboardLayout>
              }
            />

            <Route
              path="/submit"
              element={
                <DashboardLayout
                  title="Submit New Ticket"
                  subtitle="Report issues and request assistance"
                >
                  <Submit />
                </DashboardLayout>
              }
            />

            <Route
              path="/ticket/:id"
              element={
                <DashboardLayout
                  title="Ticket Details"
                  subtitle="View and manage ticket information"
                  showBreadcrumbs={true}
                >
                  <TicketDetail />
                </DashboardLayout>
              }
            />

            {/* Customer Portal - Accessible to all roles */}
            <Route
              path="/customer"
              element={
                <DashboardLayout
                  title="Customer Portal"
                  subtitle="Manage your tickets and requests"
                >
                  <CustomerPortal />
                </DashboardLayout>
              }
            />

            {/* Manager Dashboard - Requires manager role or higher */}
            <Route
              path="/manager"
              element={
                <ProtectedRoute
                  minRole="manager"
                  fallbackComponent={
                    <DashboardLayout>
                      <AccessDenied message="Manager access required. Please switch to a manager or admin role." />
                    </DashboardLayout>
                  }
                >
                  <DashboardLayout
                    title="Manager Dashboard"
                    subtitle="Manage tickets and team assignments"
                  >
                    <ManagerDashboardPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Admin Dashboard - Requires admin role */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute
                  requiredRole="admin"
                  fallbackComponent={
                    <DashboardLayout>
                      <AccessDenied message="Administrator access required. Please switch to an admin role." />
                    </DashboardLayout>
                  }
                >
                  <DashboardLayout
                    title="Admin Dashboard"
                    subtitle="System administration and analytics"
                  >
                    <AdminDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* 404 Not Found */}
            <Route
              path="*"
              element={
                <DashboardLayout>
                  <NotFound />
                </DashboardLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
