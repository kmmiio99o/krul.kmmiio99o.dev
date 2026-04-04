import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, useMediaQuery, useTheme } from "@mui/material";
import { createDynamicTheme, theme as defaultTheme } from "./theme";
import { DataProvider, useData } from "./context/DataContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Admin from "./pages/Admin";
import LoadingScreen from "./components/LoadingScreen";
import MobileDock from "./components/navbar/MobileDock";
import { loadSiteData } from "./utils/storage";
import { AnimatePresence, motion } from "framer-motion";

const shouldShowLoadingScreen = loadSiteData().customization.animations.loadingAnimation;

function ThemedApp() {
  const { data, loading: dataLoading } = useData();
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  const theme = useMemo(() => {
    if (isAdmin || dataLoading) return defaultTheme;
    return createDynamicTheme(data.customization.colors.background);
  }, [data.customization.colors.background, isAdmin, dataLoading]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContentWithRouter />
    </ThemeProvider>
  );
}

function AppContentWithRouter() {
  const { data } = useData();
  const location = useLocation();
  const animations = data.customization.animations;

  const transitionVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slide: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
    },
  };

  const variant = animations.enabled
    ? (transitionVariants[animations.pageTransition as keyof typeof transitionVariants] || transitionVariants.fade)
    : { initial: { opacity: 1 }, animate: { opacity: 1 } };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <motion.div initial={variant.initial} animate={variant.animate} transition={{ duration: animations.enabled ? 0.3 : 0 }}>
              <Home />
            </motion.div>
          } />
          <Route path="/about" element={
            <motion.div initial={variant.initial} animate={variant.animate} transition={{ duration: animations.enabled ? 0.3 : 0 }}>
              <About />
            </motion.div>
          } />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <DockWrapper />
    </AnimatePresence>
  );
}

function DockWrapper() {
  const { data } = useData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDockMode = (data.customization.navbar.mobileStyle || "dropdown") === "dock" && isMobile;
  const navbar = data.customization.navbar;

  if (!isDockMode) return null;
  return (
    <MobileDock
      primaryColor={data.customization.colors.primary}
      borderRadius={navbar.borderRadius ?? 24}
      blur={navbar.blur ?? 20}
      shadow={navbar.shadow ?? true}
      bgOpacity={navbar.bgOpacity ?? 0.9}
      showAdmin={navbar.showAdmin ?? true}
      itemBorderRadius={Math.max(0, (navbar.borderRadius ?? 24) - 12)}
    />
  );
}

function AppContent() {
  const [loading, setLoading] = useState(shouldShowLoadingScreen);
  const { data, loading: dataLoading } = useData();

  useEffect(() => {
    if (!dataLoading && shouldShowLoadingScreen) {
      if (!data.customization.animations.loadingAnimation) {
        setLoading(false);
      }
    }
  }, [dataLoading, data.customization.animations.loadingAnimation]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
      {!loading && (
        <Router>
          <ThemedApp />
        </Router>
      )}
    </>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}