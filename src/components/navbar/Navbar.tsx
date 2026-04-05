import { useState } from "react";
import {
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useData } from "../../context/DataContext";
import NavButton from "./NavButton";
import MobileDropdown from "./MobileDropdown";
import MobileDock from "./MobileDock";
import { NAV_ITEMS, ADMIN_ITEM } from "../../constants/navigation";
import DiscordAvatar from "../FetchAvatar";
import { AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data } = useData();

  const primaryColor = data.customization.colors.primary;
  const navbar = data.customization.navbar;

  const isDockMode = (navbar.mobileStyle || "dropdown") === "dock" && isMobile;
  if (isDockMode) return null;

  const backgroundColor = data.customization.colors.surface || "#1A1A1A";
  const textColor = data.customization.colors.textPrimary || "#FAFAFA";

  const borderRadius = navbar.borderRadius ?? 16;
  const blur = navbar.blur ?? 16;
  const bgOpacity = navbar.bgOpacity ?? 0.85;
  const padding = navbar.padding ?? 3;
  const hasShadow = navbar.shadow ?? true;
  const buttonPosition = navbar.buttonPosition || "center";

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const identity = (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}
    >
      {navbar.showAvatar && (
        <DiscordAvatar
          discordId={data.profile.discordId}
          avatarUrl={data.profile.avatarUrl}
          size={32}
          color={primaryColor}
        />
      )}
      {navbar.showName && (
        <Box
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: "0.95rem",
            color: textColor,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {data.profile.name}
        </Box>
      )}
    </Box>
  );

  const navButtons = (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {NAV_ITEMS.map((item) => (
        <NavButton key={item.path} item={item} primaryColor={primaryColor} />
      ))}
    </Box>
  );

  const adminButton = navbar.showAdmin && (
    <NavButton item={ADMIN_ITEM} primaryColor={primaryColor} isSecondary />
  );

  const mobileMenuBtn = (
    <IconButton
      onClick={() => setMobileOpen(!mobileOpen)}
      sx={{
        bgcolor: `${primaryColor}15`,
        color: primaryColor,
        borderRadius: "50%",
        "&:hover": {
          bgcolor: `${primaryColor}25`,
        },
      }}
    >
      {mobileOpen ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  );

  const getLayout = () => {
    if (buttonPosition === "left") {
      return (
        <>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {identity}
            {!isMobile && navButtons}
            {!isMobile && adminButton}
          </Box>
          {isMobile && mobileMenuBtn}
        </>
      );
    }

    if (buttonPosition === "center") {
      return (
        <>
          {identity}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {!isMobile && navButtons}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            {!isMobile && adminButton}
            {isMobile && mobileMenuBtn}
          </Box>
        </>
      );
    }

    if (buttonPosition === "right") {
      return (
        <>
          {identity}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: "auto" }}
          >
            {!isMobile && navButtons}
            {!isMobile && adminButton}
            {isMobile && mobileMenuBtn}
          </Box>
        </>
      );
    }

    if (buttonPosition === "space-between") {
      return (
        <>
          {identity}
          {!isMobile && navButtons}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isMobile && adminButton}
            {isMobile && mobileMenuBtn}
          </Box>
        </>
      );
    }

    return (
      <>
        {identity}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: "auto" }}
        >
          {!isMobile && navButtons}
          {!isMobile && adminButton}
          {isMobile && mobileMenuBtn}
        </Box>
      </>
    );
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <Container maxWidth="lg" sx={{ pointerEvents: "auto", py: 1.5 }}>
        <Toolbar
          sx={{
            bgcolor: hexToRgba(backgroundColor, bgOpacity),
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            borderRadius: `${borderRadius}px`,
            boxShadow: hasShadow ? "0 4px 20px rgba(0,0,0,0.2)" : "none",
            justifyContent: "space-between",
            px: { xs: padding, sm: padding + 1 },
            py: padding * 0.5,
            minHeight: 56,
            position: "relative",
          }}
        >
          {getLayout()}
        </Toolbar>

        <AnimatePresence>
          {isMobile && mobileOpen && (
            <MobileDropdown
              onClose={() => setMobileOpen(false)}
              primaryColor={primaryColor}
              bgColor={data.customization.colors.background}
              surfaceColor={data.customization.colors.surface}
              mobileStyle={navbar.mobileStyle}
            />
          )}
        </AnimatePresence>
      </Container>
      {isDockMode && <MobileDock primaryColor={primaryColor} />}
    </Box>
  );
}
