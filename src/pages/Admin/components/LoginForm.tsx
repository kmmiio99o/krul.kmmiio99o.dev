import { Box, TextField, Button, Typography, Card, CardContent, Stack } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";

type LoginFormProps = {
  onLogin: (username: string, password: string) => void;
  error: string;
  isMobile: boolean;
};

export function LoginForm({ onLogin, error, isMobile }: LoginFormProps) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = () => {
    onLogin(form.username, form.password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400 }}>
        <CardContent sx={{ p: isMobile ? 3 : 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <LockIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
            <Typography variant="h5" fontWeight={600}>
              Dostęp Admina
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
              Wprowadź dane aby zarządzać stroną
            </Typography>
          </Box>
          <Stack spacing={2.5}>
            <TextField
              label="Użytkownik"
              fullWidth
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <TextField
              label="Hasło"
              type="password"
              fullWidth
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={!!error}
              helperText={error}
            />
            <Button variant="contained" size="large" fullWidth onClick={handleSubmit}>
              Zaloguj
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
