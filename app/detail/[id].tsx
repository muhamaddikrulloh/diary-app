import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDiary } from "../../src/context/DiaryContext";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getById, likedIds, toggleLike } = useDiary();
  const entry = getById(id);

  if (!entry) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  const liked = likedIds.has(entry.id);
  return (
    <>
      <Stack.Screen options={{ title: entry.title }} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.moodContainer}>
              <Text style={styles.mood}>{entry.mood}</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.date}>{entry.date}</Text>
              <Text style={styles.title}>{entry.title}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.body}>{entry.body}</Text>
        </View>

        <Pressable
          onPress={() => toggleLike(entry.id)}
          style={({ pressed }) => [
            styles.likeButton,
            liked ? styles.likeButtonActive : styles.likeButtonInactive,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={liked ? "Batal sukai diary" : "Sukai diary"}
        >
          <Text style={styles.likeText}>{liked ? "♥ Disukai" : "♡ Suka"}</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACE.l,
    gap: SPACE.m,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.m,
  },
  moodContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  mood: {
    fontSize: 26,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    fontWeight: "500",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.text,
  },
  likeButton: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  likeButtonInactive: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  likeButtonActive: {
    backgroundColor: COLORS.dangerLight,
    borderColor: "#FCA5A5",
  },
  likeText: {
    fontWeight: "600",
    fontSize: 15,
    color: COLORS.danger,
  },
  pressed: {
    opacity: 0.7,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: TYPO.body,
  },
});
