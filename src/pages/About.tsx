import { Typography, Box, Container, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function About() {
  const { data } = useData();
  const { about, customization } = data;
  const colors = customization.colors;
  const animations = customization.animations;
  const layout = customization.layout;

  const hasFunFact = about.funFact && about.funFact.trim().length > 0;

  const animType = animations.enabled ? (animations.type === "none" ? "fade" : animations.type) : "fade";
  const variants = (animationVariants as Record<string, typeof animationVariants.fade>)[animType] || animationVariants.fade;

  const maxWidth = layout.contentMaxWidth || "lg";
  const pageStyle = layout.pageStyle || "default";
  const cardRadius = layout.cardBorderRadius ?? 16;
  const cardBorder = layout.cardBorder ?? false;
  const cardShadow = layout.cardShadow ?? true;
  const cardBg = layout.cardBackground || "surface";

  const getCardBg = () => {
    if (cardBg === "primary") return `${colors.primary}12`;
    if (cardBg === "transparent") return "transparent";
    return colors.surface;
  };

  const getCardSx = () => ({
    p: 3,
    borderRadius: `${cardRadius}px`,
    bgcolor: getCardBg(),
    border: cardBorder ? `1px solid ${colors.primary}20` : "none",
    boxShadow: cardShadow ? "0 2px 12px rgba(0,0,0,0.15)" : "none",
  });

  const isDockMode = (data.customization.navbar.mobileStyle || "dropdown") === "dock";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.background,
        pt: isDockMode ? { xs: 6, sm: 8 } : { xs: 12, sm: 14 },
        pb: isDockMode ? 12 : 6,
        px: 2,
      }}
    >
      <Container maxWidth={maxWidth as any}>
        <motion.div
          variants={variants}
          initial={animations.enabled ? "hidden" : "visible"}
          animate="visible"
          transition={{ duration: animations.enabled ? 0.5 : 0 }}
        >
          {/* Header */}
          <Box sx={{ mb: layout.sectionSpacing }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: colors.primary,
                letterSpacing: "-0.03em",
                fontSize: { xs: "2rem", sm: "2.5rem" },
                mb: 2,
              }}
            >
              About
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                backgroundColor: colors.primary,
                borderRadius: 2,
              }}
            />
          </Box>

          {/* Bio Content */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: hasFunFact ? "1fr 1fr" : "1fr" },
              gap: layout.sectionSpacing,
              alignItems: "start",
            }}
          >
            {pageStyle === "cards" ? (
              <>
                <Box sx={getCardSx()}>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.9,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                      color: colors.textPrimary,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {about.bio}
                  </Typography>
                </Box>
                {hasFunFact && (
                  <motion.div
                    whileHover={animations.hoverEffects ? { scale: 1.02 } : undefined}
                    transition={{ duration: 0.2 }}
                  >
                    <Box sx={getCardSx()}>
                      <Typography
                        variant="overline"
                        sx={{
                          color: colors.primary,
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          fontSize: "0.7rem",
                          display: "block",
                          mb: 2,
                        }}
                      >
                        Fun Fact
                      </Typography>
                      <Typography
                        sx={{
                          color: colors.textPrimary,
                          fontWeight: 500,
                          fontSize: "1.1rem",
                        }}
                      >
                        {about.funFact}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </>
            ) : pageStyle === "sections" ? (
              <>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: colors.primary,
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      fontSize: "0.7rem",
                      display: "block",
                      mb: 1.5,
                    }}
                  >
                    Bio
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.9,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                      color: colors.textPrimary,
                      whiteSpace: "pre-line",
                      mb: 2,
                    }}
                  >
                    {about.bio}
                  </Typography>
                  <Divider sx={{ borderColor: `${colors.primary}15` }} />
                </Box>
                {hasFunFact && (
                  <motion.div
                    whileHover={animations.hoverEffects ? { scale: 1.02 } : undefined}
                    transition={{ duration: 0.2 }}
                  >
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{
                          color: colors.primary,
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          fontSize: "0.7rem",
                          display: "block",
                          mb: 1.5,
                        }}
                      >
                        Fun Fact
                      </Typography>
                      <Typography
                        sx={{
                          color: colors.textPrimary,
                          fontWeight: 500,
                          fontSize: "1.1rem",
                        }}
                      >
                        {about.funFact}
                      </Typography>
                      <Divider sx={{ borderColor: `${colors.primary}15`, mt: 2 }} />
                    </Box>
                  </motion.div>
                )}
              </>
            ) : (
              <>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.9,
                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                      color: colors.textPrimary,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {about.bio}
                  </Typography>
                </Box>
                {hasFunFact && (
                  <motion.div
                    whileHover={animations.hoverEffects ? { scale: 1.02 } : undefined}
                    transition={{ duration: 0.2 }}
                  >
                    <Box
                      sx={{
                        p: 4,
                        borderRadius: `${cardRadius}px`,
                        bgcolor: `${colors.primary}08`,
                        border: `1px solid ${colors.primary}20`,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Typography
                        variant="overline"
                        sx={{
                          color: colors.primary,
                          fontWeight: 600,
                          letterSpacing: "0.15em",
                          fontSize: "0.7rem",
                          display: "block",
                          mb: 2,
                        }}
                      >
                        Fun Fact
                      </Typography>
                      <Typography
                        sx={{
                          color: colors.textPrimary,
                          fontWeight: 500,
                          fontSize: "1.1rem",
                        }}
                      >
                        {about.funFact}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </>
            )}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
