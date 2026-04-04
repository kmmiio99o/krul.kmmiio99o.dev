import {
  Box,
  Typography,
  Chip,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import DiscordAvatar from "../components/FetchAvatar";
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

export default function Home() {
  const { data } = useData();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { profile, sections, customization } = data;
  const display = customization.display;
  const colors = customization.colors;
  const animations = customization.animations;
  const layout = customization.layout;

  const hasNickname = profile.nickname && profile.nickname.trim().length > 0;

  const animType = animations.enabled
    ? animations.type === "none"
      ? "fade"
      : animations.type
    : "fade";
  const variants =
    (animationVariants as Record<string, typeof animationVariants.fade>)[
      animType
    ] || animationVariants.fade;

  const containerVariants = {
    hidden: { opacity: animations.enabled ? 0 : 1 },
    visible: {
      opacity: 1,
      transition: animations.enabled
        ? { staggerChildren: 0.1 }
        : { staggerChildren: 0 },
    },
  };

  const itemVariants = {
    hidden: animations.enabled
      ? variants.hidden
      : { opacity: 1, y: 0, scale: 1 },
    visible: animations.enabled
      ? variants.visible
      : { opacity: 1, y: 0, scale: 1 },
  };

  const columns =
    layout.sectionColumns === "auto"
      ? { xs: "1fr", md: "1fr 1fr" }
      : { xs: "1fr", md: `repeat(${layout.sectionColumns}, 1fr)` };
  const maxWidthMap: Record<string, string> = {
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1600px",
  };
  const maxWidthValue = maxWidthMap[layout.contentMaxWidth || "md"] || "900px";
  const pageStyle = layout.pageStyle || "default";
  const cardRadius = layout.cardBorderRadius ?? 16;
  const cardBorder = layout.cardBorder ?? false;
  const cardShadow = layout.cardShadow ?? true;
  const cardBg = layout.cardBackground || "surface";
  const spacing = layout.sectionSpacing ?? 8;

  const getCardBg = () => {
    if (cardBg === "primary") return `${colors.primary}12`;
    if (cardBg === "transparent") return "transparent";
    return colors.surface;
  };

  const getCardSx = () => ({
    p: 2.5,
    height: "100%",
    borderRadius: `${cardRadius}px`,
    bgcolor: getCardBg(),
    border: cardBorder ? `1px solid ${colors.primary}20` : "none",
    boxShadow: cardShadow ? "0 2px 12px rgba(0,0,0,0.15)" : "none",
  });

  const SectionItem = ({
    label,
    value,
  }: {
    label: string;
    value: string[];
  }) => {
    const ChipItem = ({ item }: { item: string }) => {
      if (!isMobile && animations.hoverEffects) {
        return (
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.15 }}
          >
            <Chip
              label={item}
              size="small"
              sx={{
                borderColor: `${colors.primary}40`,
                color: colors.textPrimary,
                bgcolor: `${colors.primary}08`,
                fontWeight: 500,
                "&:hover": {
                  bgcolor: `${colors.primary}20`,
                  borderColor: colors.primary,
                },
              }}
            />
          </motion.div>
        );
      }
      return (
        <Chip
          label={item}
          size="small"
          sx={{
            borderColor: `${colors.primary}40`,
            color: colors.textPrimary,
            bgcolor: `${colors.primary}08`,
            fontWeight: 500,
            "&:hover": {
              bgcolor: `${colors.primary}20`,
              borderColor: colors.primary,
            },
          }}
        />
      );
    };

    const chips = (value || []).map((item, idx) => (
      <ChipItem key={idx} item={item} />
    ));

    const content = (
      <>
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
          {label}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>{chips}</Box>
      </>
    );

    if (pageStyle === "cards") {
      return (
        <motion.div
          variants={itemVariants}
          transition={{ duration: animations.enabled ? 0.4 : 0 }}
        >
          <Box sx={getCardSx()}>{content}</Box>
        </motion.div>
      );
    }

    if (pageStyle === "sections") {
      return (
        <motion.div
          variants={itemVariants}
          transition={{ duration: animations.enabled ? 0.4 : 0 }}
        >
          <Box
            sx={{ pb: spacing, borderBottom: `1px solid ${colors.primary}15` }}
          >
            {content}
          </Box>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={itemVariants}
        transition={{ duration: animations.enabled ? 0.4 : 0 }}
      >
        {content}
      </motion.div>
    );
  };

  const isDockMode =
    (data.customization.navbar.mobileStyle || "dropdown") === "dock";

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
      <Container sx={{ maxWidth: maxWidthValue }}>
        <motion.div
          variants={containerVariants}
          initial={isMobile ? false : animations.enabled ? "hidden" : "visible"}
          animate={isMobile ? "visible" : "visible"}
        >
          {/* Profile Header */}
          <motion.div
            variants={itemVariants}
            transition={{
              duration: isMobile ? 0 : animations.enabled ? 0.5 : 0,
            }}
          >
            {pageStyle === "cards" ? (
              <Box sx={{ ...getCardSx(), mb: spacing }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  {display.showAvatar && (
                    <DiscordAvatar
                      discordId={profile.discordId}
                      avatarUrl={profile.avatarUrl}
                      size={display.avatarSize}
                      color={colors.primary}
                    />
                  )}
                  <Box
                    sx={{
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        color: colors.primary,
                        letterSpacing: "-0.03em",
                        fontSize: { xs: "2.5rem", sm: "3rem" },
                        mb: 1,
                        minHeight: {
                          xs: "auto",
                          sm: hasNickname ? "3.5rem" : "auto",
                        },
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {hasNickname ? (
                          <motion.span
                            key="nickname"
                            initial={
                              isMobile
                                ? { opacity: 1 }
                                : animations.enabled
                                  ? { opacity: 0, y: -10 }
                                  : { opacity: 1, y: 0 }
                            }
                            animate={
                              isMobile
                                ? { opacity: 1 }
                                : animations.enabled
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 1, y: 0 }
                            }
                            exit={
                              isMobile
                                ? { opacity: 1 }
                                : animations.enabled
                                  ? { opacity: 0, y: 10 }
                                  : { opacity: 1, y: 0 }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            {profile.nickname}
                          </motion.span>
                        ) : (
                          <motion.span
                            key="name"
                            initial={
                              isMobile
                                ? { opacity: 1 }
                                : animations.enabled
                                  ? { opacity: 0, y: -10 }
                                  : { opacity: 1, y: 0 }
                            }
                            animate={
                              isMobile
                                ? { opacity: 1 }
                                : animations.enabled
                                  ? { opacity: 1, y: 0 }
                                  : { opacity: 1, y: 0 }
                            }
                            exit={
                              isMobile
                                ? { opacity: 1 }
                                : animations.enabled
                                  ? { opacity: 0, y: 10 }
                                  : { opacity: 1, y: 0 }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            {profile.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Typography>

                    {hasNickname && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textSecondary,
                          fontWeight: 500,
                          mb: 0.5,
                        }}
                      >
                        {profile.name}
                      </Typography>
                    )}

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        justifyContent: { xs: "center", sm: "flex-start" },
                      }}
                    >
                      {display.showBirthday && (
                        <Typography
                          sx={{
                            color: colors.textSecondary,
                            fontWeight: 500,
                          }}
                        >
                          {profile.birthday}
                        </Typography>
                      )}
                      {display.showBirthday && display.showPronouns && (
                        <Typography sx={{ color: colors.textSecondary }}>
                          •
                        </Typography>
                      )}
                      {display.showPronouns && (
                        <Typography
                          sx={{
                            color: colors.textSecondary,
                            fontWeight: 500,
                          }}
                        >
                          {profile.pronouns}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  gap: 3,
                  mb: spacing,
                }}
              >
                {display.showAvatar && (
                  <DiscordAvatar
                    discordId={profile.discordId}
                    avatarUrl={profile.avatarUrl}
                    size={display.avatarSize}
                    color={colors.primary}
                  />
                )}
                <Box
                  sx={{
                    textAlign: { xs: "center", sm: "left" },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      color: colors.primary,
                      letterSpacing: "-0.03em",
                      fontSize: { xs: "2.5rem", sm: "3rem" },
                      mb: 1,
                      minHeight: {
                        xs: "auto",
                        sm: hasNickname ? "3.5rem" : "auto",
                      },
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {hasNickname ? (
                        <motion.span
                          key="nickname"
                          initial={
                            isMobile
                              ? { opacity: 1 }
                              : animations.enabled
                                ? { opacity: 0, y: -10 }
                                : { opacity: 1, y: 0 }
                          }
                          animate={
                            isMobile
                              ? { opacity: 1 }
                              : animations.enabled
                                ? { opacity: 1, y: 0 }
                                : { opacity: 1, y: 0 }
                          }
                          exit={
                            isMobile
                              ? { opacity: 1 }
                              : animations.enabled
                                ? { opacity: 0, y: 10 }
                                : { opacity: 1, y: 0 }
                          }
                          transition={{ duration: 0.3 }}
                        >
                          {profile.nickname}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="name"
                          initial={
                            isMobile
                              ? { opacity: 1 }
                              : animations.enabled
                                ? { opacity: 0, y: -10 }
                                : { opacity: 1, y: 0 }
                          }
                          animate={
                            isMobile
                              ? { opacity: 1 }
                              : animations.enabled
                                ? { opacity: 1, y: 0 }
                                : { opacity: 1, y: 0 }
                          }
                          exit={
                            isMobile
                              ? { opacity: 1 }
                              : animations.enabled
                                ? { opacity: 0, y: 10 }
                                : { opacity: 1, y: 0 }
                          }
                          transition={{ duration: 0.3 }}
                        >
                          {profile.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Typography>

                  {hasNickname && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                        fontWeight: 500,
                        mb: 0.5,
                      }}
                    >
                      {profile.name}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      justifyContent: { xs: "center", sm: "flex-start" },
                    }}
                  >
                    {display.showBirthday && (
                      <Typography
                        sx={{
                          color: colors.textSecondary,
                          fontWeight: 500,
                        }}
                      >
                        Birthday: {profile.birthday}
                      </Typography>
                    )}
                    {display.showBirthday && display.showPronouns && (
                      <Typography sx={{ color: colors.textSecondary }}>
                        •
                      </Typography>
                    )}
                    {display.showPronouns && (
                      <Typography
                        sx={{
                          color: colors.textSecondary,
                          fontWeight: 500,
                        }}
                      >
                        {profile.pronouns}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </motion.div>

          {/* Sections Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: columns,
              gap: spacing,
            }}
          >
            {(sections.likes.items || []).length > 0 && (
              <SectionItem
                label={sections.likes.label || "Zainteresowania"}
                value={sections.likes.items}
              />
            )}
            {(sections.besties.items || []).length > 0 && (
              <SectionItem
                label={sections.besties.label || "Najlepsi przyjaciele"}
                value={sections.besties.items}
              />
            )}
            {(sections.anime.items || []).length > 0 && (
              <SectionItem
                label={sections.anime.label || "Anime / Manga"}
                value={sections.anime.items}
              />
            )}
            {(sections.food.items || []).length > 0 && (
              <SectionItem
                label={sections.food.label || "Jedzenie"}
                value={sections.food.items}
              />
            )}
            {(sections.artists.items || []).length > 0 && (
              <SectionItem
                label={sections.artists.label || "Artyści"}
                value={sections.artists.items}
              />
            )}
            {(sections.athletes.items || []).length > 0 && (
              <SectionItem
                label={sections.athletes.label || "Sportowcy"}
                value={sections.athletes.items}
              />
            )}
            {(data.customSections || []).map((section) => (
              <SectionItem
                key={section.id}
                label={section.label}
                value={section.items || []}
              />
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
