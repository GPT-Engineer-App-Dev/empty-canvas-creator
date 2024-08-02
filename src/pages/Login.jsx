import { SupabaseAuthUI } from "@/integrations/supabase/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <Card className="w-[400px] shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Package size={32} />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-lg mt-2">
            Sign in to manage your items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SupabaseAuthUI />
          <p className="text-center text-sm text-muted-foreground mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
