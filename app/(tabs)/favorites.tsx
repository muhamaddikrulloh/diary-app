import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DiaryCard from "../../src/components/DiaryCard";
import EmptyState from "../../src/components/EmptyState";
import {
  clearAllFavorites,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { COLORS, LAYOUT, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const favoriteEntries = useAppSelector((state) =>
    state.diary.entries.filter((entry) => entry.liked),
  );

  const handleClearFavorites = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
        "Yakin ingin menghapus semua diary dari Favorite?",
      );

      if (confirmed) {
        dispatch(clearAllFavorites());
      }

      return;
    }

    Alert.alert(
      "Hapus Semua Favorite",
      "Yakin ingin menghapus semua diary dari daftar favorite?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus Semua",
          style: "destructive",
          onPress: () => dispatch(clearAllFavorites()),
        },
      ],
    );
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <View style={styles.screen}>
        <FlatList
          data={favoriteEntries}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.diaryRow,
                index === 0 && styles.firstRow,
                index === favoriteEntries.length - 1 && styles.lastRow,
              ]}
            >
              <DiaryCard
                compact
                title={item.title}
                date={item.date}
                preview={item.preview}
                mood={item.mood}
                liked={item.liked}
                onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
                onPress={() =>
                  router.push({
                    pathname: "/detail/[id]",
                    params: {
                      id: String(item.id),
                    },
                  })
                }
              />
            </View>
          )}
          ListHeaderComponent={
            <View>
              <View style={styles.headerRow}>
                <View style={styles.headerContent}>
                  <Text style={styles.header}>Favorite</Text>
                  <Text style={styles.counter}>{favoriteEntries.length} diary favorite</Text>
                </View>

                {favoriteEntries.length > 0 && (
                  <Pressable
                    onPress={handleClearFavorites}
                    hitSlop={SPACE.xs}
                    accessibilityRole="button"
                    accessibilityLabel="Hapus Semua Favorite"
                    style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
                  >
                    <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
                    <Text style={styles.clearButtonText}>Hapus semua</Text>
                  </Pressable>
                )}
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={[styles.diaryRow, styles.firstRow, styles.lastRow]}>
              <EmptyState
                compact
                icon="heart-outline"
                title="Belum Ada Favorite"
                description="Diary yang kamu tandai sebagai favorite akan muncul di sini."
              />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.heroStart,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.heroStart,
  },
  listContent: {
    width: "100%",
    maxWidth: LAYOUT.content,
    alignSelf: "center",
    flexGrow: 1,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    paddingBottom: SPACE.xxl,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACE.s,
    marginBottom: SPACE.l,
  },
  headerContent: {
    flexShrink: 1,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.white,
  },
  counter: {
    color: COLORS.onViolet,
    fontSize: TYPO.body,
    marginTop: SPACE.xs,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACE.xs,
    minHeight: 40,
    paddingHorizontal: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.surface,
  },
  clearButtonText: {
    color: COLORS.danger,
    fontSize: TYPO.caption,
    fontWeight: "600",
  },
  firstRow: {
    borderTopWidth: 1,
    borderTopLeftRadius: RADIUS.card,
    borderTopRightRadius: RADIUS.card,
    overflow: "hidden",
  },
  diaryRow: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  lastRow: {
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.65,
  },
});
