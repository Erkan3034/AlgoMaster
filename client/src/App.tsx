import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { LanguageProvider } from "@/lib/i18n";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import DataStructuresPage from "@/pages/data-structures";
import AlgorithmsPage from "@/pages/algorithms";
import VisualizerPage from "@/pages/visualizer";
import GlossaryPage from "@/pages/glossary";
import PlaygroundPage from "@/pages/playground";
import AdminLogin from "@/pages/admin-login";
import AdminDashboard from "@/pages/admin-dashboard";
import NotFound from "@/pages/not-found";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/data-structures" component={DataStructuresPage} />
          <Route path="/data-structures/:slug" component={DataStructuresPage} />
          <Route path="/algorithms" component={AlgorithmsPage} />
          <Route path="/algorithms/:slug" component={AlgorithmsPage} />
          <Route path="/visualizer" component={VisualizerPage} />
          <Route path="/glossary" component={GlossaryPage} />
          <Route path="/playground" component={PlaygroundPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="dsa-master-theme">
        <LanguageProvider>
          <TooltipProvider>
            <Switch>
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/admin" component={AdminDashboard} />
              <Route component={MainLayout} />
            </Switch>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
