import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to Our App</h1>
      <p className="text-xl text-muted-foreground mb-8">Your one-stop shop for item management</p>
      <div className="space-x-4">
        <Button asChild>
          <Link to="/items">View Items</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
