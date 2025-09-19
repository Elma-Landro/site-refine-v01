import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/crisis" element={<iframe src="/crisis.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Crisis Timeline" />} />
          <Route path="/crisis-fr" element={<iframe src="/crisis-fr.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Crisis Timeline FR" />} />
          <Route path="/index-fr" element={<iframe src="/index-fr.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Accueil FR" />} />
          <Route path="/these" element={<iframe src="/these.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Thèse" />} />
          <Route path="/these-fr" element={<iframe src="/these-fr.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Thèse FR" />} />
          <Route path="/curriculum" element={<iframe src="/curriculum.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Curriculum" />} />
          <Route path="/curriculum-fr" element={<iframe src="/curriculum-fr.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Curriculum FR" />} />
          <Route path="/talks" element={<iframe src="/talks.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Talks" />} />
          <Route path="/talks-fr" element={<iframe src="/talks-fr.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Talks FR" />} />
          <Route path="/contact" element={<iframe src="/contact.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Contact" />} />
          <Route path="/contact-fr" element={<iframe src="/contact-fr.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Contact FR" />} />
          <Route path="/collaborate" element={<iframe src="/collaborate.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Collaborate" />} />
          <Route path="/collaborate-fr" element={<iframe src="/collaborate-fr.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Collaborate FR" />} />
          <Route path="/rare-pepe" element={<iframe src="/rare-pepe.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Rare Pepe" />} />
          <Route path="/rare-pepe-fr" element={<iframe src="/rare-pepe-fr.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Rare Pepe FR" />} />
          <Route path="/atelier" element={<iframe src="/atelier.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Atelier" />} />
          <Route path="/plan-du-site" element={<iframe src="/plan-du-site.html" style={{ width: '100%', height: '100vh', border: 'none' }} title="Plan du site" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
