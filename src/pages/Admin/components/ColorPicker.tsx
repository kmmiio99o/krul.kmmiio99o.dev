import { Box, TextField, Typography } from "@mui/material";

type ColorPickerProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  description?: string;
};

export function ColorPicker({ label, value, onChange, prefix, description }: ColorPickerProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: value,
          border: "2px solid rgba(255,255,255,0.15)",
          cursor: "pointer",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            position: "absolute",
            top: -10,
            left: -10,
            width: 60,
            height: 60,
            border: "none",
            cursor: "pointer",
            opacity: 0,
          }}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          {label}
        </Typography>
        {description && (
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
            {description}
          </Typography>
        )}
        <TextField
          value={value}
          onChange={(e) => onChange(e.target.value)}
          size="small"
          fullWidth
          sx={{ fontFamily: "monospace" }}
          InputProps={{
            startAdornment: prefix ? (
              <Box sx={{ mr: 1, color: "text.secondary", fontSize: "0.8rem" }}>
                {prefix}
              </Box>
            ) : undefined,
          }}
        />
      </Box>
    </Box>
  );
}
