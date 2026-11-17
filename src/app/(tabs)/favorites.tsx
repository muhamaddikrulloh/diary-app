import { FlatList, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";

import { useAppDispatch, useAppSelector } from "../../hooks";

import { toggleFavorite } from "../../features/diary/diarySlice";

import DiaryCard from "../../components/DiaryCard";

import { COLORS, SPACE, TYPO } from "../../styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const favoriteEntries = useAppSelector((state) =>
    state.diary.entries.filter((entry) => entry.liked),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite</Text>

      <Text style={styles.counter}>
        {favoriteEntries.length} diary favorite
      </Text>

      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
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
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada favorite.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },

  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
  },

  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },

  empty: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 40,
  },
});
