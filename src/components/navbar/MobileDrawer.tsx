import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  alpha,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS, ADMIN_ITEM } from "../../constants/navigation";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  primaryColor: string;
  userName: string;
}

export default function MobileDrawer({
  open,
  onClose,
  primaryColor,
  userName,
}: MobileDrawerProps) {
  const location = useLocation();

  const renderLink = (item: typeof ADMIN_ITEM) => {
    const isActive = location.pathname === item.path;
    return (
      <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
        <ListItemButton
          component={Link}
          to={item.path}
          onClick={onClose}
          sx={{
            borderRadius: "16px",
            mx: 1,
            bgcolor: isActive ? alpha(primaryColor, 0.1) : "transparent",
            color: isActive ? primaryColor : "text.primary",
            "&.Mui-selected": { bgcolor: alpha(primaryColor, 0.15) },
          }}
        >
          <ListItemIcon
            sx={{ color: isActive ? primaryColor : "inherit", minWidth: 40 }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          p: 2,
          bgcolor: "background.paper",
          backgroundImage: "none",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{ px: 2, mb: 3, fontWeight: 800, color: primaryColor }}
      >
        {userName}
      </Typography>
      <List>
        {NAV_ITEMS.map(renderLink)}
        <Box sx={{ my: 2, height: "1px", bgcolor: "divider", mx: 2 }} />
        {renderLink(ADMIN_ITEM)}
      </List>
    </Drawer>
  );
}
