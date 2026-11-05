import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DiaryCard from "../../src/components/DiaryCard";
import { useDiary } from "../../src/context/DiaryContext";
import { useDiarySearch } from "../../src/hooks/useDiarySearch";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["🎯", "😞", "😴", "😊"];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState("");
  const { entries, likedIds, toggleLike } = useDiary();

  const { query, setQuery, filteredEntries, resultCount } = useDiarySearch(
    entries,
    selectedMood,
  );

  const searchRef = useRef<React.ElementRef<typeof TextInput>>(null);

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: "/detail/[id]",
        params: { id: String(id) },
      });
    },
    [router],
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    searchRef.current?.focus();
  }, [setQuery]);

  const resetFilter = useCallback(() => {
    setQuery("");
    setSelectedMood("");
  }, [setQuery]);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <View style={styles.searchRow}>
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari diary..."
          placeholderTextColor={COLORS.muted}
          style={styles.search}
        />

        <Pressable
          onPress={clearSearch}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Hapus pencarian"
        >
          <Ionicons name="close" size={18} color={COLORS.muted} />
        </Pressable>
      </View>

      <View style={styles.filterRow}>
        <View style={styles.moodRow}>
          {MOODS.map((mood) => {
            const isActive = selectedMood === mood;
            return (
              <Pressable
                key={mood}
                onPress={() => setSelectedMood(selectedMood === mood ? "" : mood)}
                style={({ pressed }) => [
                  styles.moodButton,
                  isActive && styles.moodButtonActive,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={`Filter mood ${mood}`}
              >
                <Text style={styles.moodText}>{mood}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={resetFilter}
          style={({ pressed }) => [
            styles.resetButton,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Reset filter"
        >
          <Text style={styles.resetText}>Reset Filter</Text>
        </Pressable>
      </View>

      <Text style={styles.counter}>{resultCount} entri ditemukan</Text>

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() => openDetail(item.id)}
            onToggleLike={() => toggleLike(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Diary tidak ditemukan.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  searchRow: {
    flexDirection: "row",
    gap: SPACE.s,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: TYPO.body,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  clearButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACE.s,
    marginTop: SPACE.m,
  },
  moodRow: {
    flexDirection: "row",
    gap: SPACE.s,
    flexShrink: 1,
  },
  moodButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  moodButtonActive: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accent,
    borderWidth: 1.5,
  },
  moodText: {
    fontSize: 20,
  },
  resetButton: {
    height: 44,
    paddingHorizontal: SPACE.m,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  resetText: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 12,
  },
  counter: {
    color: COLORS.muted,
    fontSize: TYPO.caption,
    fontWeight: "500",
    marginVertical: SPACE.s,
  },
  list: {
    gap: SPACE.m,
    paddingBottom: SPACE.xl,
  },
  empty: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: TYPO.body,
    paddingTop: 48,
  },
  pressed: {
    opacity: 0.7,
  },
});
