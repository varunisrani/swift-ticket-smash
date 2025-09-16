import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <p className="mb-6 text-gray-500">The page "{location.pathname}" could not be found.</p>
        <Button asChild>
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
