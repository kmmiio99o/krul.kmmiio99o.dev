import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useData } from "../context/DataContext";
import {
  ProfileTab,
  SectionsTab,
  AboutTab,
  AppearanceTab,
  NavbarTab,
  AnimationsTab,
  SaveBar,
  LoginForm,
} from "./Admin/index";

const ADMIN_KEY = "krul_admin_logged_in";

export default function Admin() {
  const {
    data,
    hasChanges,
    updateData,
    updateProfile,
    updateSections,
    updateCustomSections,
    updateAbout,
    resetData,
    saveToCloud,
  } = useData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem(ADMIN_KEY) === "true",
  );
  const [tab, setTab] = useState(0);
  const [loginError, setLoginError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const handleSave = async () => {
    setSaving(true);
    const ok = await saveToCloud();
    setSaving(false);
    if (ok) setSaved(true);
  };

  const handleLogin = (username: string, password: string) => {
    if (
      username === import.meta.env.VITE_ADMIN_USERNAME &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      sessionStorage.setItem(ADMIN_KEY, "true");
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Nieprawidłowe dane");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_KEY);
    setIsLoggedIn(false);
  };

  const updateColor = (key: string, value: string) => {
    updateData({
      customization: {
        ...data.customization,
        colors: { ...data.customization.colors, [key]: value },
      },
    });
  };

  const updateDisplay = (key: string, value: unknown) => {
    updateData({
      customization: {
        ...data.customization,
        display: { ...data.customization.display, [key]: value },
      },
    });
  };

  const updateLayout = (key: string, value: unknown) => {
    updateData({
      customization: {
        ...data.customization,
        layout: { ...data.customization.layout, [key]: value },
      },
    });
  };

  const updateNavbar = (key: string, value: unknown) => {
    updateData({
      customization: {
        ...data.customization,
        navbar: { ...data.customization.navbar, [key]: value },
      },
    });
  };

  const updateAnimations = (key: string, value: unknown) => {
    updateData({
      customization: {
        ...data.customization,
        animations: { ...data.customization.animations, [key]: value },
      },
    });
  };

  if (!isLoggedIn) {
    return (
      <LoginForm onLogin={handleLogin} error={loginError} isMobile={isMobile} />
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: isMobile ? 2 : 4,
        px: isMobile ? 1 : 2,
        pb: hasChanges ? 10 : isMobile ? 2 : 4,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={700}
            color="primary"
            sx={{ lineHeight: 1 }}
          >
            Panel Admina
          </Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ flexShrink: 0 }}
          >
            Wyloguj
          </Button>
        </Box>

        <Card>
          <Box
            sx={{
              position: "relative",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Profil" />
              <Tab label="Sekcje" />
              <Tab label="O mnie" />
              <Tab label="Wygląd" />
              <Tab label="Navbar" />
              <Tab label="Animacje" />
            </Tabs>
          </Box>
          <CardContent sx={{ p: isMobile ? 2 : 3 }}>
            {tab === 0 && (
              <ProfileTab
                profile={data.profile}
                updateProfile={updateProfile}
                isMobile={isMobile}
              />
            )}
            {tab === 1 && (
              <SectionsTab
                sections={data.sections}
                customSections={data.customSections}
                updateSections={updateSections}
                updateCustomSections={updateCustomSections}
                isMobile={isMobile}
              />
            )}
            {tab === 2 && (
              <AboutTab
                about={data.about}
                updateAbout={updateAbout}
                isMobile={isMobile}
              />
            )}
            {tab === 3 && (
              <AppearanceTab
                customization={data.customization}
                updateColor={updateColor}
                updateDisplay={updateDisplay}
                updateLayout={updateLayout}
              />
            )}
            {tab === 4 && (
              <NavbarTab
                customization={data.customization}
                updateNavbar={updateNavbar}
              />
            )}
            {tab === 5 && (
              <AnimationsTab
                customization={data.customization}
                updateAnimations={updateAnimations}
              />
            )}
          </CardContent>
        </Card>
      </Container>

      {hasChanges && (
        <SaveBar
          hasChanges={hasChanges}
          saved={saved}
          saving={saving}
          isMobile={isMobile}
          onSave={handleSave}
          onReset={resetData}
        />
      )}
    </Box>
  );
}
