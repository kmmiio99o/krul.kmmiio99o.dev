import { Box, Button, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

type SaveBarProps = {
  hasChanges: boolean;
  saved: boolean;
  saving: boolean;
  isMobile: boolean;
  onSave: () => void;
  onReset: () => void;
};

export function SaveBar({ hasChanges, saved, saving, isMobile, onSave, onReset }: SaveBarProps) {
  if (!hasChanges) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: isMobile ? 16 : 24,
        left: "50%",
        transform: "translateX(-50%)",
        width: isMobile ? "calc(100% - 32px)" : "calc(100% - 48px)",
        maxWidth: isMobile ? 400 : 700,
        bgcolor: "rgba(26,26,26,0.95)",
        backdropFilter: "blur(16px)",
        borderRadius: isMobile ? "24px" : 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
        px: isMobile ? 2 : 3,
        py: isMobile ? 1.5 : 1.5,
        zIndex: 9998,
        animation: "slideUp 0.3s ease-out",
        "@keyframes slideUp": {
          from: { opacity: 0, transform: "translateX(-50%) translateY(20px)" },
          to: { opacity: 1, transform: "translateX(-50%) translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 1.5 : 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flex: 1,
            minWidth: 0,
          }}
        >
          {saved ? (
            <>
              <CheckCircleIcon sx={{ color: "#81C784", fontSize: 18, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ color: "#81C784", fontWeight: 500, fontSize: "0.85rem" }}>
                Zapisano!
              </Typography>
            </>
          ) : (
            <>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#FFB4AB",
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                Masz niezapisane zmiany
              </Typography>
            </>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={onReset}
            sx={{
              borderColor: "#3D3D3D",
              color: "text.secondary",
              fontSize: "0.8rem",
              px: 2,
              "&:hover": {
                borderColor: "#F2B8B5",
                color: "#F2B8B5",
                bgcolor: "rgba(242,184,181,0.08)",
              },
            }}
          >
            Resetuj
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={saving ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <SaveIcon />}
            onClick={onSave}
            disabled={saving}
            sx={{
              bgcolor: saved ? "#81C784" : "#FFB4AB",
              color: saved ? "#fff" : "#442726",
              fontSize: "0.8rem",
              px: 2,
              "&:hover": { bgcolor: saved ? "#66BB6A" : "#FFCCC7" },
              "&:disabled": { bgcolor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" },
            }}
          >
            {saving ? "Zapisywanie..." : saved ? "Zapisano!" : "Zapisz"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
