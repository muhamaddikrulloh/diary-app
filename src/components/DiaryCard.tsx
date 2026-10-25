import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, RADIUS, SPACE, TYPO } from "../styles/tokens";
type Props = {
  title: string;
  date: string;
  preview: string;
  moodImage: any;
  liked?: boolean;
  onPress?: () => void;
  onToggleLike?: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  moodImage,
  liked = false,
  onPress = () => {},
  onToggleLike = () => {},
}: Props) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={styles.main}
        accessibilityLabel={`Buka entri ${title}`}
      >
        <Image source={moodImage} style={styles.mood} />
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
        style={styles.likeButton}
        accessibilityLabel={liked ? "Batal suka" : "Suka"}
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
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
  },
  main: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    gap: SPACE.m,
    padding: SPACE.m,
    alignItems: "center",
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  likeButton: {
    padding: SPACE.m,
    flexShrink: 0,
  },
  mood: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#eef2ff",
  },
  title: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: 4,
  },
  preview: {
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  like: {
    fontSize: 26,
    color: "#ef4444",
  },
});
