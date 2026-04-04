import { useState, useEffect, useCallback, useMemo } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import { loadSiteData } from "../utils/storage";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
`;

const barsPulse = keyframes`
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
`;

const orbitSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const orbitCounterSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const dotsWave = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

function SpinnerAnimation({ color, size, speed }: { color: string; size: number; speed: number }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        "& > div": {
          animation: `${spin} ${1.5 / speed}s linear infinite`,
        },
      }}
    >
      <CircularProgress size={size} thickness={4} sx={{ color }} />
    </Box>
  );
}

function PulseAnimation({ color, size, speed }: { color: string; size: number; speed: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: color,
        animation: `${pulse} ${1.5 / speed}s ease-in-out infinite`,
      }}
    />
  );
}

function BounceAnimation({ color, size, speed }: { color: string; size: number; speed: number }) {
  const dotSize = size / 4;
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor: color,
            animation: `${bounce} ${1.4 / speed}s ease-in-out infinite`,
            animationDelay: `${i * 0.16}s`,
          }}
        />
      ))}
    </Box>
  );
}

function BarsAnimation({ color, size, speed }: { color: string; size: number; speed: number }) {
  const barCount = 5;
  const barWidth = size / (barCount * 2 + barCount - 1);
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: size }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <Box
          key={i}
          sx={{
            width: barWidth,
            height: "100%",
            borderRadius: 1,
            bgcolor: color,
            transformOrigin: "center",
            animation: `${barsPulse} ${1.2 / speed}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </Box>
  );
}

function OrbitAnimation({ color, size, speed }: { color: string; size: number; speed: number }) {
  const orbitSize = size;
  const dotSize = size / 5;
  return (
    <Box
      sx={{
        width: orbitSize,
        height: orbitSize,
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `2px solid ${color}30`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          animation: `${orbitSpin} ${2 / speed}s linear infinite`,
        }}
      >
        <Box
          sx={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor: color,
            position: "absolute",
            top: -dotSize / 2,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 8,
          borderRadius: "50%",
          border: `2px solid ${color}20`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 8,
          animation: `${orbitCounterSpin} ${1.5 / speed}s linear infinite`,
        }}
      >
        <Box
          sx={{
            width: dotSize * 0.7,
            height: dotSize * 0.7,
            borderRadius: "50%",
            bgcolor: color,
            opacity: 0.6,
            position: "absolute",
            bottom: -dotSize * 0.35,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </Box>
    </Box>
  );
}

function DotsAnimation({ color, size, speed }: { color: string; size: number; speed: number }) {
  const dotSize = size / 6;
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Box
          key={i}
          sx={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor: color,
            animation: `${dotsWave} ${1.2 / speed}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </Box>
  );
}

function GradientRingAnimation({ color, size, speed }: { color: string; size: number; speed: number }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `conic-gradient(from 0deg, transparent, ${color}, transparent)`,
        animation: `${spin} ${1.5 / speed}s linear infinite`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: size - 8,
          height: size - 8,
          borderRadius: "50%",
          bgcolor: "#0D0D0D",
        }}
      />
    </Box>
  );
}

const animationMap: Record<string, React.FC<{ color: string; size: number; speed: number }>> = {
  spinner: SpinnerAnimation,
  pulse: PulseAnimation,
  bounce: BounceAnimation,
  bars: BarsAnimation,
  orbit: OrbitAnimation,
  dots: DotsAnimation,
  gradient: GradientRingAnimation,
};

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [loaded, setLoaded] = useState(false);

  const savedData = useMemo(() => loadSiteData(), []);
  const ls = savedData.customization.animations.loadingScreen || {};

  const style = ls.style || "spinner";
  const title = ls.title || "Loading";
  const subtitle = (ls.subtitle || "{name}'s profile").replace("{name}", savedData.profile.name);
  const showTitle = ls.showTitle !== false;
  const showSubtitle = ls.showSubtitle !== false;
  const speed = ls.speed || 1;
  const color = ls.color || savedData.customization.colors.primary || "#FFB4AB";
  const size = ls.size || 80;
  const bgColor = savedData.customization.colors.background || "#0D0D0D";

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  const shouldAnimate = savedData.customization.animations.loadingAnimation;

  useEffect(() => {
    if (!shouldAnimate) {
      handleLoaded();
      return;
    }
    const timer = setTimeout(() => {
      if (!loaded) {
        handleLoaded();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [loaded, handleLoaded, shouldAnimate]);

  useEffect(() => {
    if (!shouldAnimate) return;
    const hasRealAvatar = savedData.profile.avatarUrl;
    const hasNoAvatar = !savedData.profile.avatarUrl;
    if (hasRealAvatar) {
      setLoaded(true);
      setTimeout(onComplete, 300);
    } else if (hasNoAvatar) {
      const img = new Image();
      img.onload = () => handleLoaded();
      img.onerror = () => handleLoaded();
      img.src = "/avatar.svg";
    }
  }, [shouldAnimate, onComplete, handleLoaded]);

  const AnimationComponent = animationMap[style] || SpinnerAnimation;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          mb: showTitle || showSubtitle ? 4 : 0,
        }}
      >
        <AnimationComponent color={color} size={size} speed={speed} />
      </Box>

      {(showTitle || showSubtitle) && (
        <Box sx={{ textAlign: "center" }}>
          {showTitle && (
            <Typography
              sx={{
                fontWeight: 600,
                color: color,
                letterSpacing: "0.1em",
                mb: showSubtitle ? 1 : 0,
                fontSize: "1rem",
              }}
            >
              {title}
            </Typography>
          )}
          {showSubtitle && (
            <Typography
              sx={{
                fontWeight: 400,
                color: "#A0A0A0",
                fontFamily: "monospace",
                fontSize: "0.85rem",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}