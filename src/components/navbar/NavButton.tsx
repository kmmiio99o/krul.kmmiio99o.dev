import { Button, alpha } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function NavButton({
  item,
  primaryColor,
  isSecondary = false,
}: any) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <Button
      component={Link}
      to={item.path}
      startIcon={item.icon}
      sx={{
        px: 2.5,
        py: 1,
        borderRadius: "100px", // Pill shape
        textTransform: "none",
        fontSize: "0.9rem",
        fontWeight: isActive ? 700 : 500,
        color: isActive
          ? primaryColor
          : isSecondary
            ? alpha("#fff", 0.5)
            : "text.primary",
        bgcolor: isActive ? alpha(primaryColor, 0.1) : "transparent",
        "&:hover": {
          bgcolor: alpha(primaryColor, 0.05),
          color: primaryColor,
        },
      }}
    >
      {item.label}
    </Button>
  );
}
