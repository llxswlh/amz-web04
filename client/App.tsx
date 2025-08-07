import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import CooperationCases from "./pages/CooperationCases";
import CaseDetail from "./pages/CaseDetail";
import ChinaMapPage from "./pages/ChinaMapPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/about"
            element={
              <PlaceholderPage
                title="关于我们"
                description="了解TMG集团的发展历程和企业文化"
              />
            }
          />
          <Route
            path="/business"
            element={
              <PlaceholderPage
                title="媒体资源"
                description="全面了解我们的媒体资源和服务内容"
              />
            }
          />
          <Route
            path="/bus-stations"
            element={
              <PlaceholderPage
                title="全国公路客运站"
                description="覆盖全国主要城市的公路客运站媒体网络"
              />
            }
          />
          <Route
            path="/bus-media"
            element={
              <PlaceholderPage
                title="全国公交媒体"
                description="城市公交系统媒体投放解决方案"
              />
            }
          />
          <Route
            path="/highway-media"
            element={
              <PlaceholderPage
                title="全国公路媒体"
                description="高速公路及国道媒体网络覆盖"
              />
            }
          />
          <Route
            path="/other-media"
            element={
              <PlaceholderPage
                title="其他媒体"
                description="多样化媒体资源整合服务"
              />
            }
          />
          <Route path="/cooperation-cases" element={<CooperationCases />} />
          <Route path="/case/:id" element={<CaseDetail />} />
          <Route path="/china-map" element={<ChinaMapPage />} />
          <Route
            path="/contact"
            element={
              <PlaceholderPage
                title="联系我们"
                description="与我们取得联系，洽谈合作事宜"
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;

// Ensure we only create root once, even with HMR
let root = (window as any).__reactRoot;
if (!root) {
  root = createRoot(container);
  (window as any).__reactRoot = root;
}

root.render(<App />);
