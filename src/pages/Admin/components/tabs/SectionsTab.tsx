import { Stack, TextField, Typography, Button, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import type { SiteData } from "../../../../utils/storage";

type SectionsTabProps = {
  sections: SiteData["sections"];
  customSections: SiteData["customSections"];
  updateSections: (data: Partial<SiteData["sections"]>) => void;
  updateCustomSections: (sections: SiteData["customSections"]) => void;
  isMobile: boolean;
};

const BUILTIN_SECTIONS: { key: keyof SiteData["sections"]; defaultLabel: string }[] = [
  { key: "likes", defaultLabel: "Zainteresowania" },
  { key: "besties", defaultLabel: "Najlepsi przyjaciele" },
  { key: "anime", defaultLabel: "Anime / Manga" },
  { key: "food", defaultLabel: "Jedzenie" },
  { key: "artists", defaultLabel: "Artyści" },
  { key: "athletes", defaultLabel: "Sportowcy" },
];

function SectionCard({
  label,
  items,
  onLabelChange,
  onItemsChange,
  onRemove,
  canRemove,
}: {
  label: string;
  items: string[];
  onLabelChange: (v: string) => void;
  onItemsChange: (v: string[]) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <Box sx={{ p: 2, borderRadius: 2, border: "1px solid #2D2D2D", bgcolor: "#1A1A1A" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <TextField
          size="small"
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          sx={{ flex: 1, mr: 1 }}
          placeholder="Nazwa sekcji"
        />
        {canRemove && (
          <IconButton size="small" onClick={onRemove} sx={{ color: "error.main", flexShrink: 0 }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <TextField
        label="Elementy (oddzielone przecinkami)"
        fullWidth
        multiline
        rows={2}
        size="small"
        value={items.join(", ")}
        onChange={(e) => onItemsChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
      />
    </Box>
  );
}

export function SectionsTab({ sections, customSections, updateSections, updateCustomSections, isMobile }: SectionsTabProps) {
  const addSection = () => {
    updateCustomSections([
      ...customSections,
      { id: Date.now().toString(), label: "Nowa sekcja", items: [] },
    ]);
  };

  const removeCustomSection = (index: number) => {
    updateCustomSections(customSections.filter((_, i) => i !== index));
  };

  const updateCustomSection = (index: number, updates: Partial<SiteData["customSections"][number]>) => {
    const updated = [...customSections];
    updated[index] = { ...updated[index], ...updates };
    updateCustomSections(updated);
  };

  const removeBuiltin = (key: keyof SiteData["sections"]) => {
    updateSections({ [key]: { label: sections[key].label, items: [] } });
  };

  const updateBuiltinLabel = (key: keyof SiteData["sections"], label: string) => {
    updateSections({ [key]: { label, items: sections[key].items } });
  };

  const updateBuiltinItems = (key: keyof SiteData["sections"], items: string[]) => {
    updateSections({ [key]: { label: sections[key].label, items } });
  };

  return (
    <Stack spacing={isMobile ? 2 : 3}>
      <Typography variant="h6" color="primary">
        Sekcje
      </Typography>

      {BUILTIN_SECTIONS.map((section) => (
        <SectionCard
          key={section.key}
          label={sections[section.key].label || section.defaultLabel}
          items={sections[section.key].items || []}
          onLabelChange={(v) => updateBuiltinLabel(section.key, v)}
          onItemsChange={(items) => updateBuiltinItems(section.key, items)}
          onRemove={() => removeBuiltin(section.key)}
          canRemove={sections[section.key].items.length > 0}
        />
      ))}

      {customSections.map((section, index) => (
        <SectionCard
          key={section.id}
          label={section.label}
          items={section.items || []}
          onLabelChange={(v) => updateCustomSection(index, { label: v })}
          onItemsChange={(items) => updateCustomSection(index, { items })}
          onRemove={() => removeCustomSection(index)}
          canRemove
        />
      ))}

      <Button variant="outlined" startIcon={<AddIcon />} onClick={addSection} sx={{ alignSelf: "flex-start" }}>
        Dodaj sekcję
      </Button>
    </Stack>
  );
}
