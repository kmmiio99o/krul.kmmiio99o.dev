import { useState, useEffect } from "react";
import { Avatar, Skeleton } from "@mui/material";

interface DiscordAvatarProps {
  discordId: string;
  avatarUrl?: string;
  size?: number;
  color?: string;
  onLoaded?: () => void;
}

export default function DiscordAvatar({
  discordId,
  avatarUrl: customAvatarUrl,
  size = 120,
  color = "#FFB4AB",
  onLoaded,
}: DiscordAvatarProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (customAvatarUrl && customAvatarUrl.trim()) {
      setSrc(customAvatarUrl);
      setLoading(false);
      onLoaded?.();
      return;
    }

    setSrc("/avatar.svg");
    setLoading(false);
    onLoaded?.();
  }, [discordId, customAvatarUrl, onLoaded]);

  if (loading) {
    return (
      <Skeleton
        variant="circular"
        width={size}
        height={size}
        sx={{
          bgcolor: `${color}20`,
          border: `2px solid ${color}`,
          borderRadius: "50%",
        }}
      />
    );
  }

  return (
    <Avatar
      src={src || undefined}
      alt="Avatar"
      sx={{
        width: size,
        height: size,
        border: `2px solid ${color}`,
        bgcolor: "transparent",
      }}
    />
  );
}