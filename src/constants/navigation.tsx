import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";

export const NAV_ITEMS = [
  { label: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
  { label: "About", path: "/about", icon: <InfoIcon fontSize="small" /> },
];

export const ADMIN_ITEM = {
  label: "Admin",
  path: "/admin",
  icon: <SettingsIcon fontSize="small" />,
};
