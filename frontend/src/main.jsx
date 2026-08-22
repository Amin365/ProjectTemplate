import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { QueryClient ,QueryClientProvider } from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux'
import store, { persister } from './app/store.js'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from './components/ThemeProvider.jsx'
import {toast} from "sonner";
import "./styles/globals.css";
import "./styles/xaltech-mobile-cta.css";

// Preload XalTech public routes during idle time so navigation feels instant
if (typeof window !== "undefined" && 'requestIdleCallback' in window) {
  requestIdleCallback(() => {
    import("./components/XalTech/HomePage");
    import("./components/XalTech/ServicesPage");
    import("./components/XalTech/AboutPage");
  }, { timeout: 2000 });
} else if (typeof window !== "undefined") {
  // fallback
  setTimeout(() => {
    import("./components/XalTech/HomePage");
    import("./components/XalTech/ServicesPage");
    import("./components/XalTech/AboutPage");
  }, 1200);
}

// import { HelmetProvider } from "react-helmet-async";

/* =========================
   PWA: Service Worker
========================= */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        // console.log('Service Worker registered');

        // Detect updates (no forced reload)
        reg.onupdatefound = () => {
          const newWorker = reg.installing;

          if (!newWorker) return;

          newWorker.onstatechange = () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              console.log('New version available');
              // Here you can show a toast: "New update available"
              toast("New version available. Please refresh.", {
                action: {
                  label: "Refresh",
                  onClick: () => {
                    window.location.reload();
                  }
                }
              });
            }
          };
        };
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  });
}
/* ========================= */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <BrowserRouter>
            <ThemeProvider>
           
                <App />
                <Toaster />
             
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
