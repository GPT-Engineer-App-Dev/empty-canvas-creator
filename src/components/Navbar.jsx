import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navItems } from "@/nav-items";

const Navbar = () => {
  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-foreground">
              Item Manager
            </Link>
          </div>
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Button key={item.to} variant="ghost" asChild>
                <Link to={item.to} className="flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
