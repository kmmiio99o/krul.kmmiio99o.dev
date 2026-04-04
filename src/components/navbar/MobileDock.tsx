import { cloneElement, isValidElement } from "react";
import { Box, ListItemButton, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { NAV_ITEMS, ADMIN_ITEM } from "../../constants/navigation";

interface Props {
  primaryColor: string;
  borderRadius?: number;
  blur?: number;
  shadow?: boolean;
  bgOpacity?: number;
  showAdmin?: boolean;
  itemBorderRadius?: number;
}

function DockItem({ item, primaryColor, itemBorderRadius }: { item: typeof NAV_ITEMS[0]; primaryColor: string; itemBorderRadius: number }) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  const icon = isValidElement(item.icon)
    ? cloneElement(item.icon as React.ReactElement<any>, { sx: { fontSize: 24, width: 24, height: 24 } })
    : item.icon;

  return (
    <ListItemButton
      component={Link}
      to={item.path}
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.25,
        minWidth: 64,
        py: 0.75,
        px: 1,
        borderRadius: `${itemBorderRadius}px`,
        color: isActive ? primaryColor : "rgba(255,255,255,0.5)",
        bgcolor: isActive ? `${primaryColor}15` : "transparent",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: isActive ? `${primaryColor}25` : "rgba(255,255,255,0.05)",
          color: isActive ? primaryColor : "rgba(255,255,255,0.8)",
        },
      }}
    >
      {icon}
      <ListItemText
        primary={item.label}
        primaryTypographyProps={{
          fontWeight: isActive ? 600 : 500,
          fontSize: "0.65rem",
          letterSpacing: "0.01em",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      />
    </ListItemButton>
  );
}

export default function MobileDock({ primaryColor, borderRadius = 24, blur = 20, shadow = true, bgOpacity = 0.9, showAdmin = true, itemBorderRadius = 12 }: Props) {
  const items = showAdmin ? [...NAV_ITEMS, ADMIN_ITEM] : NAV_ITEMS;

  return (
    <Box
      component={motion.div}
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      sx={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        maxWidth: 500,
        mx: "auto",
        bgcolor: `rgba(26,26,26,${bgOpacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        borderRadius: `${borderRadius}px`,
        boxShadow: shadow ? "0 8px 32px rgba(0,0,0,0.5)" : "none",
        border: "1px solid rgba(255,255,255,0.08)",
        px: 1,
        py: 0.5,
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        gap: 0.25,
      }}
    >
      {items.map((item) => (
        <DockItem key={item.path} item={item} primaryColor={primaryColor} itemBorderRadius={itemBorderRadius} />
      ))}
    </Box>
  );
}
