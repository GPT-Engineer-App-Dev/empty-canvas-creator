import { Home, Package, LogIn, FileText } from "lucide-react";
import Index from "./pages/Index.jsx";
import Items from "./pages/Items.jsx";
import Login from "./pages/Login.jsx";
import Documents from "./pages/Documents.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Items",
    to: "/items",
    icon: <Package className="h-4 w-4" />,
    page: <Items />,
  },
  {
    title: "Documents",
    to: "/documents",
    icon: <FileText className="h-4 w-4" />,
    page: <Documents />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <LogIn className="h-4 w-4" />,
    page: <Login />,
  },
];
