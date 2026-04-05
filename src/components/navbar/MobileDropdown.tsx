import { Box, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { NAV_ITEMS, ADMIN_ITEM } from "../../constants/navigation";

interface Props {
  onClose: () => void;
  primaryColor: string;
  bgColor: string;
  surfaceColor: string;
  mobileStyle?: string;
}

function MenuItem({ item, primaryColor, onClose }: { item: typeof NAV_ITEMS[0]; primaryColor: string; onClose: () => void }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={item.path}
        onClick={onClose}
        sx={{
          borderRadius: "12px",
          py: 1.5,
          px: 2,
          color: isActive ? primaryColor : "rgba(255,255,255,0.6)",
          bgcolor: isActive ? `${primaryColor}12` : "transparent",
          transition: "all 0.15s ease",
          "&:hover": {
            bgcolor: isActive ? `${primaryColor}18` : "rgba(255,255,255,0.05)",
            color: isActive ? primaryColor : "rgba(255,255,255,0.9)",
          },
        }}
      >
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{
            fontWeight: isActive ? 600 : 500,
            fontSize: "0.95rem",
            letterSpacing: "0.01em",
          }}
        />
        {isActive && (
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: primaryColor,
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
}

export default function MobileDropdown({ onClose, primaryColor, bgColor, surfaceColor, mobileStyle = "dropdown" }: Props) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const allItems = [...NAV_ITEMS, ADMIN_ITEM];

  if (mobileStyle === "fullscreen") {
    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: bgColor,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {allItems.map((item, i) => (
          <Box
            key={item.path}
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i + 0.1 }}
          >
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={onClose}
              sx={{
                py: 2,
                px: 4,
                justifyContent: "center",
                color: "rgba(255,255,255,0.6)",
                transition: "all 0.15s ease",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.9)",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: isSmall ? "1.3rem" : "1.5rem",
                  letterSpacing: "-0.01em",
                }}
              />
            </ListItemButton>
          </Box>
        ))}
      </Box>
    );
  }

  if (mobileStyle === "bottom-sheet") {
    return (
      <>
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0,0,0,0.5)",
            zIndex: 9998,
          }}
        />
        <Box
          component={motion.div}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: surfaceColor,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            zIndex: 9999,
            pb: isSmall ? 4 : 2,
            pt: 1,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 4,
              borderRadius: 2,
              bgcolor: "rgba(255,255,255,0.2)",
              mx: "auto",
              mb: 2,
            }}
          />
          <List sx={{ px: 2 }}>
            {allItems.map((item) => (
              <MenuItem key={item.path} item={item} primaryColor={primaryColor} onClose={onClose} />
            ))}
          </List>
        </Box>
      </>
    );
  }

  if (mobileStyle === "dock") return null;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      sx={{
        bgcolor: surfaceColor,
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        overflow: "hidden",
        mt: 0.5,
      }}
    >
      <List sx={{ p: 1.5 }}>
        {allItems.map((item) => (
          <MenuItem key={item.path} item={item} primaryColor={primaryColor} onClose={onClose} />
        ))}
      </List>
    </Box>
  );
}
