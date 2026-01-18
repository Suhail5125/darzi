import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Booking from "@/pages/booking";
import About from "@/pages/about";
import Services from "@/pages/services";
import Dashboard from "@/pages/dashboard";
import Products from "@/pages/products";
import Cart from "@/pages/cart";
import Account from "@/pages/account";
import Notifications from "@/pages/notifications";
import Layout from "@/components/layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/booking" component={Booking} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/products" component={Products} />
        <Route path="/cart" component={Cart} />
        <Route path="/account" component={Account} />
        <Route path="/notifications" component={Notifications} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
