import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Account() {
  const [, setLocation] = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem("darzi_logged_in");
    setLocation("/");
  };

  return (
    <div className="pt-32 pb-16 min-h-screen container mx-auto px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-primary mb-12 italic">Your Account</h1>
        <div className="space-y-8">
          <div className="flex items-center gap-6 p-6 border border-primary/10 rounded-3xl bg-card">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">A</div>
            <div>
              <h2 className="text-xl font-bold">Alex Darzi</h2>
              <p className="text-muted-foreground">alex@example.com</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 rounded-2xl justify-start px-6 font-medium">Order History</Button>
            <Button variant="outline" className="h-16 rounded-2xl justify-start px-6 font-medium">Payment Methods</Button>
            <Button variant="outline" className="h-16 rounded-2xl justify-start px-6 font-medium">Shipping Address</Button>
            <Button variant="outline" className="h-16 rounded-2xl justify-start px-6 font-medium">Preferences</Button>
          </div>
          
          <Button variant="destructive" className="w-full h-14 rounded-2xl font-bold" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
