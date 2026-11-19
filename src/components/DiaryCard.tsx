import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CARD_SHADOW, COLORS, RADIUS, SPACE, TYPO } from "../styles/tokens";

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  compact?: boolean;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleFavorite,
  compact = false,
}: Props) {
  return (
    <View style={[styles.card, compact && styles.compactCard]}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Buka diary ${title}`} style={[styles.main, compact && styles.compactMain]}>
        <View style={styles.meta}>
          <View style={[styles.moodBox, compact && styles.compactMoodBox]}>
            <Text style={[styles.mood, compact && styles.compactMood]}>{mood}</Text>
          </View>
          <Text style={styles.date}>{date}</Text>
        </View>

        <Text style={[styles.title, compact && styles.compactTitle]} numberOfLines={2}>{title}</Text>
        <Text style={[styles.preview, compact && styles.compactPreview]} numberOfLines={2}>{preview}</Text>
      </Pressable>

      <Pressable
        onPress={onToggleFavorite}
        accessibilityRole="button"
        accessibilityLabel={liked ? `Hapus ${title} dari Favorite` : `Tambahkan ${title} ke Favorite`}
        accessibilityState={{ selected: liked }}
        hitSlop={4}
        style={({ pressed }) => [styles.favoriteButton, pressed && styles.pressed]}
      >
        <Ionicons name={liked ? "heart" : "heart-outline"} size={22} color={liked ? COLORS.accent : COLORS.muted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACE.m,
    padding: SPACE.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    ...CARD_SHADOW,
  },
  compactCard: {
    marginBottom: 0,
    padding: SPACE.m,
    borderWidth: 0,
    borderRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  main: {
    flex: 1,
    minWidth: 0,
    gap: SPACE.s,
  },
  compactMain: {
    gap: SPACE.xs,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.s,
  },
  moodBox: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.accentSoft,
  },
  compactMoodBox: {
    width: 28,
    height: 28,
  },
  mood: {
    fontSize: 18,
  },
  compactMood: {
    fontSize: 16,
  },
  date: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
  },
  title: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: "700",
    lineHeight: 23,
  },
  compactTitle: {
    fontSize: TYPO.body,
    lineHeight: 20,
  },
  preview: {
    color: COLORS.muted,
    fontSize: TYPO.body,
    lineHeight: 22,
  },
  compactPreview: {
    fontSize: TYPO.caption,
    lineHeight: 18,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -SPACE.xs,
    marginRight: -SPACE.s,
  },
  pressed: {
    opacity: 0.65,
  },
});
