import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button } from "@darzi/shared-ui";
import { motion } from "framer-motion";
import { ShoppingBag, Clock, CheckCircle, Package, User, Settings, LogOut } from "lucide-react";
import { Link } from "wouter";

const mockOrders = [
  {
    id: "ORD-7281",
    service: "Steam Pressing",
    status: "In Progress",
    date: "May 12, 2026",
    items: 5,
    total: "$40.00"
  },
  {
    id: "ORD-7192",
    service: "Dry Cleaning",
    status: "Delivered",
    date: "May 10, 2026",
    items: 3,
    total: "$75.00"
  },
  {
    id: "ORD-7105",
    service: "Eco Washing",
    status: "Picked Up",
    date: "May 08, 2026",
    items: 8,
    total: "$35.00"
  }
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-6 md:px-12 pb-16 page-padding-top">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Manage your orders and wardrobe care.</p>
        </div>
        <Link href="/booking">
          <Button className="rounded-full px-8 h-12 shadow-lg shadow-primary/20">
            Start New Order
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="border-primary/5 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Active Orders</p>
                <p className="text-2xl font-bold text-primary">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/5 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Completed</p>
                <p className="text-2xl font-bold text-primary">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-primary/5 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Total Items</p>
                <p className="text-2xl font-bold text-primary">142</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-serif font-bold text-primary">Recent Orders</h2>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Card key={order.id} className="border-primary/5 hover:border-primary/20 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex gap-4">
                      <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-primary/40 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Package className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="font-bold text-primary">{order.service}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{order.id} • {order.items} Items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                        <p className="text-sm font-medium">{order.date}</p>
                        <p className="text-lg font-bold text-primary">{order.total}</p>
                      </div>
                      <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" : 
                        order.status === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="ghost" className="w-full border border-dashed border-primary/20 text-muted-foreground hover:text-primary">
            View All Orders
          </Button>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-serif font-bold text-primary">Account</h2>
          <Card className="border-primary/5">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-primary/5">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-2xl font-bold">
                  A
                </div>
                <div>
                  <p className="font-bold text-primary text-lg">Alex Johnson</p>
                  <p className="text-sm text-muted-foreground">alex@example.com</p>
                </div>
              </div>
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary hover:bg-primary/5">
                  <User className="h-4 w-4" /> Profile Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-primary hover:bg-primary/5">
                  <Settings className="h-4 w-4" /> Preferences
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/5">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </nav>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold">Darzi Gold</h3>
              <p className="text-sm opacity-80">You're 3 orders away from 15% off your next tailoring session.</p>
              <Button variant="secondary" className="w-full rounded-full">View Rewards</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
