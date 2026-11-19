import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DiaryCard from "../../src/components/DiaryCard";
import EmptyState from "../../src/components/EmptyState";
import { toggleFavorite } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { CARD_SHADOW, COLORS, LAYOUT, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["all", "😍", "🎯", "😌", "🥰", "🌤️"];

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const entries = useAppSelector((state) => state.diary.entries);
  const totalDiary = entries.length;
  const totalFavorite = entries.filter((entry) => entry.liked).length;
  const [selectedMood, setSelectedMood] = useState("all");
  const filteredEntries =
    selectedMood === "all"
      ? entries
      : entries.filter((entry) => entry.mood === selectedMood);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <View style={styles.screen}>
        <FlatList
          data={filteredEntries}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={[styles.diaryRow, index === filteredEntries.length - 1 && styles.lastRow]}>
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
                    params: { id: String(item.id) },
                  })
                }
              />
            </View>
          )}
          ListHeaderComponent={
            <View>
              <Text style={styles.pageTitle}>Buku Harian</Text>

              <View style={styles.summaryPanel}>
                <Text style={styles.panelTitle}>Ringkasan Diary</Text>
                <View style={styles.summaryRow}>
                  <View style={styles.summaryIcon}>
                    <Ionicons name="book-outline" size={16} color={COLORS.accent} />
                  </View>
                  <Text style={styles.summaryLabel}>Total Diary</Text>
                  <Text style={styles.summaryValue}>{totalDiary}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <View style={styles.summaryIcon}>
                    <Ionicons name="heart-outline" size={16} color={COLORS.accent} />
                  </View>
                  <Text style={styles.summaryLabel}>Total Favorite</Text>
                  <Text style={styles.summaryValue}>{totalFavorite}</Text>
                </View>
              </View>

              <View style={styles.recentHeader}>
                <Text style={styles.panelTitle}>Catatan Terbaru</Text>
                <Text style={styles.filterLabel}>Filter mood</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
                  {MOODS.map((item) => {
                    const selected = selectedMood === item;

                    return (
                      <Pressable
                        key={item}
                        onPress={() => setSelectedMood(item)}
                        hitSlop={SPACE.xs}
                        accessibilityRole="button"
                        accessibilityLabel={item === "all" ? "Semua mood" : `Filter mood ${item}`}
                        accessibilityState={{ selected }}
                        style={[styles.filterButton, item !== "all" && styles.emojiFilter, selected && styles.filterActive]}
                      >
                        <Text style={[styles.filterText, selected && styles.filterTextActive]}>
                          {item === "all" ? "Semua" : item}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={[styles.diaryRow, styles.lastRow]}>
              <EmptyState
                compact
                icon={entries.length === 0 ? "book-outline" : "search-outline"}
                title={entries.length === 0 ? "Belum Ada Diary" : "Diary Tidak Ditemukan"}
                description={
                  entries.length === 0
                    ? "Mulai tulis cerita pertamamu melalui menu Tambah."
                    : "Tidak ada diary dengan mood yang dipilih. Coba pilih mood lain."
                }
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
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    paddingBottom: SPACE.xxl,
  },
  pageTitle: {
    marginBottom: SPACE.m,
    color: COLORS.white,
    fontSize: TYPO.h1,
    fontWeight: "700",
  },
  summaryPanel: {
    gap: SPACE.s,
    marginBottom: SPACE.m,
    padding: SPACE.l,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    ...CARD_SHADOW,
  },
  panelTitle: {
    color: COLORS.text,
    fontSize: TYPO.title,
    fontWeight: "700",
    lineHeight: 22,
  },
  summaryRow: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    borderRadius: RADIUS.small,
    backgroundColor: COLORS.accentSoft,
  },
  summaryIcon: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
  },
  summaryLabel: {
    flex: 1,
    color: COLORS.text,
    fontSize: TYPO.body,
  },
  summaryValue: {
    color: COLORS.accent,
    fontSize: TYPO.stat,
    fontWeight: "700",
  },
  recentHeader: {
    padding: SPACE.l,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: COLORS.border,
    borderTopLeftRadius: RADIUS.card,
    borderTopRightRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  filterLabel: {
    marginTop: SPACE.m,
    marginBottom: SPACE.s,
    color: COLORS.muted,
    fontSize: TYPO.caption,
    fontWeight: "600",
  },
  filterRow: {
    gap: SPACE.xs,
  },
  filterButton: {
    minWidth: 40,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
  },
  filterActive: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent,
  },
  emojiFilter: {
    minWidth: 38,
    paddingHorizontal: SPACE.s,
  },
  filterText: {
    color: COLORS.text,
    fontSize: TYPO.label,
    fontWeight: "600",
  },
  filterTextActive: {
    color: COLORS.white,
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
});
