import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/generated_images/minimalist_logo_for_darzi_tailor_service.png";

export default function Login() {
  const [_, setLocation] = useLocation();

  const handleLogin = () => {
    localStorage.setItem("darzi_logged_in", "true");
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/10 shadow-2xl shadow-primary/5">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto h-20 w-20 relative overflow-hidden rounded-full border border-primary/10 mb-2">
            <img src={logoImage} alt="Darzi Logo" className="object-cover h-full w-full" />
          </div>
          <div>
            <CardTitle className="font-serif text-3xl font-bold text-primary">Welcome Back</CardTitle>
            <CardDescription className="text-base mt-2">Sign in to your Darzi account</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleLogin} 
            className="w-full h-12 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
          >
            Log In
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            <span className="opacity-70">Don't have an account? </span>
            <Link href="/signup">
              <a className="font-medium text-primary hover:underline">Sign up</a>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}