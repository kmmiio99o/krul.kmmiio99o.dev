import { Stack, Typography, Divider, Slider, Radio, RadioGroup, Box, FormControlLabel } from "@mui/material";
import type { SiteData } from "../../../../utils/storage";
import { CustomSwitch } from "../CustomSwitch";

type NavbarTabProps = {
  customization: SiteData["customization"];
  updateNavbar: (key: string, value: unknown) => void;
};

export function NavbarTab({ customization, updateNavbar }: NavbarTabProps) {
  const navbar = customization.navbar || {};

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Elementy paska nawigacji
        </Typography>
        <Stack spacing={1.5}>
          <CustomSwitch
            label="Pokaż avatara"
            checked={navbar.showAvatar ?? true}
            onChange={(v) => updateNavbar("showAvatar", v)}
          />
          <CustomSwitch
            label="Pokaż nazwę"
            checked={navbar.showName ?? true}
            onChange={(v) => updateNavbar("showName", v)}
          />
          <CustomSwitch
            label="Pokaż przycisk Admina"
            checked={navbar.showAdmin ?? true}
            onChange={(v) => updateNavbar("showAdmin", v)}
          />
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Pozycja przycisków nawigacji
        </Typography>
        <RadioGroup
          value={navbar.buttonPosition || "center"}
          onChange={(e) => updateNavbar("buttonPosition", e.target.value)}
        >
          <FormControlLabel value="left" control={<Radio />} label="Po lewej" />
          <FormControlLabel value="center" control={<Radio />} label="Na środku" />
          <FormControlLabel value="right" control={<Radio />} label="Po prawej" />
          <FormControlLabel value="space-between" control={<Radio />} label="Rozłożone (space-between)" />
        </RadioGroup>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Wygląd paska nawigacji
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ px: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Zaokrąglenie: {navbar.borderRadius ?? 16}px
            </Typography>
            <Slider
              value={navbar.borderRadius ?? 16}
              onChange={(_, v) => updateNavbar("borderRadius", v as number)}
              min={0}
              max={32}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box sx={{ px: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Rozmycie tła (blur): {navbar.blur ?? 16}
            </Typography>
            <Slider
              value={navbar.blur ?? 16}
              onChange={(_, v) => updateNavbar("blur", v as number)}
              min={0}
              max={32}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box sx={{ px: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Przezroczystość tła: {Math.round((navbar.bgOpacity ?? 0.85) * 100)}%
            </Typography>
            <Slider
              value={navbar.bgOpacity ?? 0.85}
              onChange={(_, v) => updateNavbar("bgOpacity", v as number)}
              min={0}
              max={1}
              step={0.05}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box sx={{ px: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Padding: {navbar.padding ?? 3}
            </Typography>
            <Slider
              value={navbar.padding ?? 3}
              onChange={(_, v) => updateNavbar("padding", v as number)}
              min={0}
              max={6}
              step={0.5}
              valueLabelDisplay="auto"
            />
          </Box>
          <CustomSwitch
            label="Cień paska"
            checked={navbar.shadow ?? true}
            onChange={(v) => updateNavbar("shadow", v)}
          />
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Styl menu mobilnego
        </Typography>
        <RadioGroup
          value={navbar.mobileStyle || "dropdown"}
          onChange={(e) => updateNavbar("mobileStyle", e.target.value)}
        >
          <FormControlLabel value="dropdown" control={<Radio />} label="Dropdown (pod paskiem)" />
          <FormControlLabel value="bottom-sheet" control={<Radio />} label="Bottom sheet (od dołu)" />
          <FormControlLabel value="fullscreen" control={<Radio />} label="Pełny ekran" />
          <FormControlLabel value="dock" control={<Radio />} label="Dock (pasek na dole)" />
        </RadioGroup>
      </Box>
    </Stack>
  );
}
