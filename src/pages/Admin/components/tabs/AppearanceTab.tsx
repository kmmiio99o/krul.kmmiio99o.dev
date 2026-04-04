import { Stack, Typography, Divider, Slider, Radio, RadioGroup, Box, FormControlLabel } from "@mui/material";
import type { SiteData } from "../../../../utils/storage";
import { ColorPicker } from "../ColorPicker";
import { CustomSwitch } from "../CustomSwitch";

type AppearanceTabProps = {
  customization: SiteData["customization"];
  updateColor: (key: string, value: string) => void;
  updateDisplay: (key: string, value: unknown) => void;
  updateLayout: (key: string, value: unknown) => void;
};

export function AppearanceTab({ customization, updateColor, updateDisplay, updateLayout }: AppearanceTabProps) {
  const colors = customization.colors || {};
  const display = customization.display || {};
  const layout = customization.layout || {};

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Kolory
        </Typography>
        <Stack spacing={2.5}>
          <ColorPicker
            label="Kolor główny"
            value={colors.primary || "#FFB4AB"}
            onChange={(v) => updateColor("primary", v)}
            prefix="Primary"
            description="Przyciski, linki, akcenty"
          />
          <ColorPicker
            label="Kolor dodatkowy"
            value={colors.secondary || "#E6C2BF"}
            onChange={(v) => updateColor("secondary", v)}
            prefix="Secondary"
            description="Obramowania, tła sekcji"
          />
          <ColorPicker
            label="Kolor tła"
            value={colors.background || "#0D0D0D"}
            onChange={(v) => updateColor("background", v)}
            prefix="Tło"
            description="Główne tło strony"
          />
          <ColorPicker
            label="Kolor powierzchni"
            value={colors.surface || "#1A1A1A"}
            onChange={(v) => updateColor("surface", v)}
            prefix="Surface"
            description="Karty, panele, navbar"
          />
          <ColorPicker
            label="Kolor tekstu"
            value={colors.textPrimary || "#FAFAFA"}
            onChange={(v) => updateColor("textPrimary", v)}
            prefix="Tekst"
            description="Główny kolor tekstu"
          />
          <ColorPicker
            label="Kolor tekstu drugiego"
            value={colors.textSecondary || "#A0A0A0"}
            onChange={(v) => updateColor("textSecondary", v)}
            prefix="Tekst2"
            description="Pomocniczy tekst, placeholdery"
          />
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Opcje wyświetlania
        </Typography>
        <Stack spacing={1.5}>
          <CustomSwitch
            label="Pokaż avatara"
            checked={display.showAvatar ?? true}
            onChange={(v) => updateDisplay("showAvatar", v)}
          />
          <CustomSwitch
            label="Pokaż zaimki"
            checked={display.showPronouns ?? true}
            onChange={(v) => updateDisplay("showPronouns", v)}
          />
          <CustomSwitch
            label="Pokaż datę urodzin"
            checked={display.showBirthday ?? true}
            onChange={(v) => updateDisplay("showBirthday", v)}
          />
          <Box sx={{ px: 1, mt: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Rozmiar avatara: {display.avatarSize || 140}px
            </Typography>
            <Slider
              value={display.avatarSize || 140}
              onChange={(_, v) => updateDisplay("avatarSize", v as number)}
              min={60}
              max={200}
              valueLabelDisplay="auto"
            />
          </Box>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Styl strony
        </Typography>
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Styl treści
          </Typography>
          <RadioGroup
            value={layout.pageStyle || "default"}
            onChange={(e) => updateLayout("pageStyle", e.target.value)}
          >
            <FormControlLabel value="default" control={<Radio />} label="Bez kart (domyślny)" />
            <FormControlLabel value="cards" control={<Radio />} label="Karty z tłem" />
            <FormControlLabel value="sections" control={<Radio />} label="Sekcje z linią oddzielającą" />
          </RadioGroup>

          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Tło kart
          </Typography>
          <RadioGroup
            value={layout.cardBackground || "surface"}
            onChange={(e) => updateLayout("cardBackground", e.target.value)}
          >
            <FormControlLabel value="surface" control={<Radio />} label="Powierzchnia" />
            <FormControlLabel value="primary" control={<Radio />} label="Kolor główny (przezroczysty)" />
            <FormControlLabel value="transparent" control={<Radio />} label="Przezroczysty" />
          </RadioGroup>

          <CustomSwitch
            label="Cień kart"
            checked={layout.cardShadow ?? true}
            onChange={(v) => updateLayout("cardShadow", v)}
          />
          <CustomSwitch
            label="Obramowanie kart"
            checked={layout.cardBorder ?? false}
            onChange={(v) => updateLayout("cardBorder", v)}
          />

          <Box sx={{ px: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Zaokrąglenie kart: {layout.cardBorderRadius ?? 16}px
            </Typography>
            <Slider
              value={layout.cardBorderRadius ?? 16}
              onChange={(_, v) => updateLayout("cardBorderRadius", v as number)}
              min={0}
              max={32}
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ px: 1, mt: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Maksymalna szerokość treści
            </Typography>
            <RadioGroup
              row
              value={layout.contentMaxWidth || "lg"}
              onChange={(e) => updateLayout("contentMaxWidth", e.target.value)}
            >
              <FormControlLabel value="sm" control={<Radio />} label="Sm" />
              <FormControlLabel value="md" control={<Radio />} label="Md" />
              <FormControlLabel value="lg" control={<Radio />} label="Lg" />
              <FormControlLabel value="xl" control={<Radio />} label="Xl" />
            </RadioGroup>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
          Układ
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ px: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Odstępy sekcji: {layout.sectionSpacing ?? 8}px
            </Typography>
            <Slider
              value={layout.sectionSpacing ?? 8}
              onChange={(_, v) => updateLayout("sectionSpacing", v as number)}
              min={1}
              max={20}
              valueLabelDisplay="auto"
            />
          </Box>
          <Box sx={{ px: 1 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Kolumny na PC: {layout.sectionColumns === "auto" ? "Auto" : layout.sectionColumns}
            </Typography>
            <Slider
              value={layout.sectionColumns === "auto" ? 2 : parseInt(layout.sectionColumns as string)}
              onChange={(_, v) => updateLayout("sectionColumns", v === 2 ? "auto" : String(v))}
              min={1}
              max={3}
              marks={[{ value: 1, label: "1" }, { value: 2, label: "Auto" }, { value: 3, label: "3" }]}
              valueLabelDisplay="auto"
            />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
