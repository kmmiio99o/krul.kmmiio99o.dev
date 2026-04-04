import { Stack, TextField, Typography } from "@mui/material";
import type { SiteData } from "../../../../utils/storage";

type AboutTabProps = {
  about: SiteData["about"];
  updateAbout: (data: Partial<SiteData["about"]>) => void;
  isMobile: boolean;
};

export function AboutTab({ about, updateAbout, isMobile }: AboutTabProps) {
  return (
    <Stack spacing={isMobile ? 2 : 3}>
      <Typography variant="h6" color="primary">
        Sekcja O mnie
      </Typography>
      <TextField
        label="Bio"
        fullWidth
        multiline
        rows={6}
        value={about.bio || ""}
        onChange={(e) => updateAbout({ bio: e.target.value })}
        helperText="Obsluguje nowe linie"
      />
      <TextField
        label="Ciekawostka"
        fullWidth
        value={about.funFact || ""}
        onChange={(e) => updateAbout({ funFact: e.target.value })}
      />
    </Stack>
  );
}
