import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "@darzi/shared-utils";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster, TooltipProvider } from "@darzi/shared-ui";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Booking from "@/pages/booking";
import About from "@/pages/about";
import Services from "@/pages/services";
import Explore from "@/pages/explore";
import Dashboard from "@/pages/dashboard";
import Cart from "@/pages/cart";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import FAQ from "@/pages/faq";
import OurCraft from "@/pages/our-craft";
import Sustainability from "@/pages/sustainability";
import Careers from "@/pages/careers";
import BecomeSeller from "@/pages/become-seller";
import { ConfigTest } from "@/pages/ConfigTest";
import Layout from "@/components/layout";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
          <h1>Something went wrong</h1>
          <pre style={{ background: "#f5f5f5", padding: "10px", overflow: "auto" }}>
            {this.state.error?.toString()}
            {"\n\n"}
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/config-test" component={ConfigTest} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/faq" component={FAQ} />
      <Route path="/our-craft" component={OurCraft} />
      <Route path="/sustainability" component={Sustainability} />
      <Route path="/careers" component={Careers} />
      <Route path="/become-seller" component={BecomeSeller} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/booking" component={Booking} />
            <Route path="/about" component={About} />
            <Route path="/services" component={Services} />
            <Route path="/explore" component={Explore} />
            <Route path="/cart" component={Cart} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
