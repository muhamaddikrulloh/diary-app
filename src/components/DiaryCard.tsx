import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, TYPO } from "../styles/tokens";

type Props = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleLike: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleLike,
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={`Buka diary: ${title}`}
      >
        <View style={styles.moodContainer}>
          <Text style={styles.mood}>{mood}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.date}>{date}</Text>

          <Text style={styles.preview} numberOfLines={2}>
            {preview}
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={onToggleLike}
        style={({ pressed }) => [styles.likeButton, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel={liked ? "Batal sukai diary" : "Sukai diary"}
      >
        <Text style={styles.like}>{liked ? "♥" : "♡"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },

  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 14,
    paddingLeft: 14,
    paddingRight: 4,
    gap: 12,
  },

  moodContainer: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },

  mood: {
    fontSize: 24,
  },

  content: {
    flex: 1,
    gap: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },

  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },

  preview: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.muted,
  },

  likeButton: {
    width: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginRight: 6,
  },

  like: {
    fontSize: 24,
    color: COLORS.danger,
  },

  pressed: {
    opacity: 0.7,
  },
});
