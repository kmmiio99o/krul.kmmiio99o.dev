import { Stack, TextField, Typography, Box } from "@mui/material";
import type { SiteData } from "../../../../utils/storage";

type ProfileTabProps = {
  profile: SiteData["profile"];
  updateProfile: (data: Partial<SiteData["profile"]>) => void;
  isMobile: boolean;
};

export function ProfileTab({ profile, updateProfile, isMobile }: ProfileTabProps) {
  return (
    <Stack spacing={isMobile ? 2 : 3}>
      <Typography variant="h6" color="primary">
        Podstawowe informacje
      </Typography>
      <TextField
        label="Nazwa wyświetlana"
        fullWidth
        value={profile.name || ""}
        onChange={(e) => updateProfile({ name: e.target.value })}
      />
      <TextField
        label="Nick (opcjonalne)"
        fullWidth
        value={profile.nickname || ""}
        onChange={(e) => updateProfile({ nickname: e.target.value })}
        helperText="Wyświetla się zamiast imienia na PC"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
        }}
      >
        <TextField
          label="Data urodzin"
          fullWidth
          value={profile.birthday || ""}
          onChange={(e) => updateProfile({ birthday: e.target.value })}
        />
        <TextField
          label="Zaimki"
          fullWidth
          value={profile.pronouns || ""}
          onChange={(e) => updateProfile({ pronouns: e.target.value })}
        />
      </Box>
      <TextField
        label="URL avatara"
        fullWidth
        value={profile.avatarUrl || ""}
        onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
        helperText="Wklej URL zdjęcia"
      />
    </Stack>
  );
}
