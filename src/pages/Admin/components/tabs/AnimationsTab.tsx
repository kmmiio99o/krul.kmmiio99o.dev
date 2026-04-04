import { Stack, Typography, Divider, Radio, RadioGroup, FormControlLabel, Box, TextField, Slider } from "@mui/material";
import type { SiteData } from "../../../../utils/storage";
import { CustomSwitch } from "../CustomSwitch";
import { ColorPicker } from "../ColorPicker";

type AnimationsTabProps = {
  customization: SiteData["customization"];
  updateAnimations: (key: string, value: unknown) => void;
};

const loadingStyles = [
  { value: "spinner", label: "Spinner" },
  { value: "pulse", label: "Pulse" },
  { value: "bounce", label: "Bounce" },
  { value: "bars", label: "Bars" },
  { value: "orbit", label: "Orbit" },
  { value: "dots", label: "Dots Wave" },
  { value: "gradient", label: "Gradient Ring" },
];

export function AnimationsTab({ customization, updateAnimations }: AnimationsTabProps) {
  const animations = customization.animations || {};
  const ls = animations.loadingScreen || {};

  const updateLoadingScreen = (key: string, value: unknown) => {
    updateAnimations("loadingScreen", { ...(ls || {}), [key]: value });
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Animacje strony
        </Typography>
        <Stack spacing={1.5}>
          <CustomSwitch
            label="Włączone animacje"
            checked={animations.enabled ?? true}
            onChange={(v) => updateAnimations("enabled", v)}
          />
          <CustomSwitch
            label="Efekty najechania myszą"
            checked={animations.hoverEffects ?? true}
            onChange={(v) => updateAnimations("hoverEffects", v)}
          />
          <CustomSwitch
            label="Animacja ładowania"
            checked={animations.loadingAnimation ?? true}
            onChange={(v) => updateAnimations("loadingAnimation", v)}
          />
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Typ animacji wejścia
        </Typography>
        <RadioGroup
          value={animations.type || "fade"}
          onChange={(e) => updateAnimations("type", e.target.value)}
        >
          <FormControlLabel value="fade" control={<Radio />} label="Zanikanie (Fade)" />
          <FormControlLabel value="slide" control={<Radio />} label="Przesunięcie (Slide)" />
          <FormControlLabel value="scale" control={<Radio />} label="Skalowanie (Scale)" />
        </RadioGroup>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Przejście pomiędzy stronami
        </Typography>
        <RadioGroup
          value={animations.pageTransition || "slide"}
          onChange={(e) => updateAnimations("pageTransition", e.target.value)}
        >
          <FormControlLabel value="slide" control={<Radio />} label="Przesunięcie" />
          <FormControlLabel value="fade" control={<Radio />} label="Zanikanie" />
        </RadioGroup>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Ekran ładowania
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
              Styl animacji
            </Typography>
            <RadioGroup
              row
              value={ls.style || "spinner"}
              onChange={(e) => updateLoadingScreen("style", e.target.value)}
              sx={{ flexWrap: "wrap" }}
            >
              {loadingStyles.map((s) => (
                <FormControlLabel
                  key={s.value}
                  value={s.value}
                  control={<Radio size="small" />}
                  label={s.label}
                  sx={{ mr: 0.5 }}
                />
              ))}
            </RadioGroup>
          </Box>

          <Stack direction="row" spacing={2}>
            <CustomSwitch
              label="Pokaż tytuł"
              checked={ls.showTitle !== false}
              onChange={(v) => updateLoadingScreen("showTitle", v)}
            />
            <CustomSwitch
              label="Pokaż podtytuł"
              checked={ls.showSubtitle !== false}
              onChange={(v) => updateLoadingScreen("showSubtitle", v)}
            />
          </Stack>

          {ls.showTitle !== false && (
            <TextField
              label="Tytuł"
              value={ls.title || "Loading"}
              onChange={(e) => updateLoadingScreen("title", e.target.value)}
              size="small"
              fullWidth
            />
          )}

          {ls.showSubtitle !== false && (
            <TextField
              label="Podtytuł (użyj {name} dla imienia)"
              value={ls.subtitle || "{name}'s profile"}
              onChange={(e) => updateLoadingScreen("subtitle", e.target.value)}
              size="small"
              fullWidth
              helperText="{name} zostanie zastąpione imieniem z profilu"
            />
          )}

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
              Kolor animacji
            </Typography>
            <ColorPicker
              label="Kolor"
              value={ls.color || customization.colors.primary || "#FFB4AB"}
              onChange={(v) => updateLoadingScreen("color", v)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
              Rozmiar: {ls.size || 80}px
            </Typography>
            <Slider
              value={ls.size || 80}
              onChange={(_, v) => updateLoadingScreen("size", v)}
              min={40}
              max={160}
              step={4}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
              Szybkość: {ls.speed || 1}x
            </Typography>
            <Slider
              value={ls.speed || 1}
              onChange={(_, v) => updateLoadingScreen("speed", v)}
              min={0.25}
              max={3}
              step={0.25}
              valueLabelDisplay="auto"
              marks={[
                { value: 0.25, label: "0.25x" },
                { value: 1, label: "1x" },
                { value: 2, label: "2x" },
                { value: 3, label: "3x" },
              ]}
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}