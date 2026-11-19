import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteDiary, toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { CARD_SHADOW, COLORS, LAYOUT, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function DetailScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === Number(id)),
  );

  if (!entry) {
    return <Text style={styles.notFound}>Diary tidak ditemukan.</Text>;
  }

  const deleteEntry = () => {
    dispatch(deleteDiary(entry.id));
    router.replace("/");
  };

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Diary ini akan dihapus secara permanen. Lanjutkan?")) {
        deleteEntry();
      }
      return;
    }

    Alert.alert("Hapus Diary", "Diary ini akan dihapus secara permanen. Lanjutkan?", [
      { text: "Batal", style: "cancel" },
      { text: "Hapus", style: "destructive", onPress: deleteEntry },
    ]);
  };

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.container}>
      <View pointerEvents="none" style={styles.purpleBackground} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.metaRow}>
          <View style={styles.moodBox}>
            <Text style={styles.mood}>{entry.mood}</Text>
          </View>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={17} color={COLORS.onViolet} />
            <Text style={styles.date}>{entry.date}</Text>
          </View>
        </View>

        <Text style={styles.title}>{entry.title}</Text>

        <View style={styles.bodyCard}>
          <Text style={styles.body}>{entry.body}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/edit/[id]",
                params: { id: String(entry.id) },
              })
            }
            accessibilityRole="button"
            style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}
          >
            <Ionicons name="create-outline" size={20} color={COLORS.white} />
            <Text style={styles.editText}>Edit Diary</Text>
          </Pressable>

          <Pressable
            onPress={() => dispatch(toggleFavorite(entry.id))}
            accessibilityRole="button"
            accessibilityState={{ selected: entry.liked }}
            style={({ pressed }) => [styles.favoriteButton, pressed && styles.pressed]}
          >
            <Ionicons name={entry.liked ? "heart" : "heart-outline"} size={20} color={COLORS.accent} />
            <Text style={styles.favoriteText}>
              {entry.liked ? "Hapus dari Favorite" : "Tambah ke Favorite"}
            </Text>
          </Pressable>

          <Pressable
            onPress={confirmDelete}
            accessibilityRole="button"
            style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
          >
            <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
            <Text style={styles.deleteText}>Hapus Diary</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  purpleBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 230,
    backgroundColor: COLORS.heroStart,
  },
  content: {
    width: "100%",
    maxWidth: LAYOUT.content,
    alignSelf: "center",
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    paddingBottom: SPACE.xxl,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.m,
    marginBottom: SPACE.m,
  },
  moodBox: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.accentSoft,
  },
  mood: {
    fontSize: 30,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.s,
  },
  date: {
    color: COLORS.onViolet,
    fontSize: TYPO.label,
  },
  title: {
    marginBottom: SPACE.l,
    color: COLORS.white,
    fontSize: TYPO.h1,
    fontWeight: "700",
    lineHeight: 32,
  },
  bodyCard: {
    minHeight: 112,
    padding: SPACE.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    ...CARD_SHADOW,
  },
  body: {
    color: COLORS.text,
    fontSize: TYPO.body,
    lineHeight: 23,
  },
  actions: {
    gap: SPACE.s,
    marginTop: SPACE.m,
  },
  editButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACE.s,
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.accent,
  },
  editText: {
    color: COLORS.white,
    fontSize: TYPO.body,
    fontWeight: "700",
  },
  favoriteButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACE.s,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.surface,
  },
  favoriteText: {
    color: COLORS.accent,
    fontSize: TYPO.body,
    fontWeight: "600",
  },
  deleteButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACE.s,
    marginTop: SPACE.xs,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: TYPO.label,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
  notFound: {
    padding: SPACE.xl,
    color: COLORS.muted,
    fontSize: TYPO.body,
  },
});
