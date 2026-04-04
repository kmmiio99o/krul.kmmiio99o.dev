import { Stack, TextField, Typography, Button, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import type { SiteData } from "../../../../utils/storage";

type CustomSectionsTabProps = {
  customSections: SiteData["customSections"];
  updateCustomSections: (sections: SiteData["customSections"]) => void;
  isMobile: boolean;
};

export function CustomSectionsTab({ customSections, updateCustomSections, isMobile }: CustomSectionsTabProps) {
  const sections = customSections || [];

  const addSection = () => {
    updateCustomSections([
      ...sections,
      { id: Date.now().toString(), label: "Nowa sekcja", items: [] },
    ]);
  };

  const updateSection = (index: number, updates: Partial<SiteData["customSections"][number]>) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], ...updates };
    updateCustomSections(updated);
  };

  const removeSection = (index: number) => {
    updateCustomSections(sections.filter((_, i) => i !== index));
  };

  return (
    <Stack spacing={isMobile ? 2 : 3}>
      <Typography variant="h6" color="primary">
        Niestandardowe sekcje
      </Typography>

      {sections.length === 0 && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Brak sekcji. Dodaj pierwszą sekcję poniżej.
        </Typography>
      )}

      {sections.map((section, index) => (
        <Box
          key={section.id}
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid #2D2D2D",
            bgcolor: "#1A1A1A",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
              Sekcja {index + 1}
            </Typography>
            <IconButton size="small" onClick={() => removeSection(index)} sx={{ color: "error.main" }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <TextField
            label="Nazwa sekcji"
            fullWidth
            size="small"
            value={section.label}
            onChange={(e) => updateSection(index, { label: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Elementy (oddzielone przecinkami)"
            fullWidth
            multiline
            rows={2}
            size="small"
            value={(section.items || []).join(", ")}
            onChange={(e) => {
              const items = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
              updateSection(index, { items });
            }}
          />
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addSection}
        sx={{ alignSelf: "flex-start" }}
      >
        Dodaj sekcję
      </Button>
    </Stack>
  );
}
