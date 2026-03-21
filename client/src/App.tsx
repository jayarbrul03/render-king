import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import AcrylicRender from "./pages/AcrylicRender";
import HebelInstall from "./pages/HebelInstall";
import EPSCladding from "./pages/EPSCladding";
import SpecialtyFinishes from "./pages/SpecialtyFinishes";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Safety from "./pages/Safety";
import Contact from "./pages/Contact";
import BuilderPortal from "./pages/BuilderPortal";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/acrylic-render" component={AcrylicRender} />
      <Route path="/services/hebel-installation" component={HebelInstall} />
      <Route path="/services/eps-cladding" component={EPSCladding} />
      <Route path="/services/specialty-finishes" component={SpecialtyFinishes} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/about" component={About} />
      <Route path="/safety" component={Safety} />
      <Route path="/contact" component={Contact} />
      <Route path="/submit-project" component={BuilderPortal} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
