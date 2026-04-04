import { Switch, FormControlLabel, Box, Typography } from "@mui/material";

type CustomSwitchProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
};

export function CustomSwitch({ label, checked, onChange, description }: CustomSwitchProps) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={
        <Box sx={{ ml: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.4 }}>
            {label}
          </Typography>
          {description && (
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", lineHeight: 1.4 }}>
              {description}
            </Typography>
          )}
        </Box>
      }
      sx={{ m: 0, alignItems: "center", p: 0 }}
    />
  );
}
