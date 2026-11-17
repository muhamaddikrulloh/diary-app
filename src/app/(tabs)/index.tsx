import { FlatList, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";

import DiaryCard from "../../components/DiaryCard";

import { toggleFavorite } from "../../features/diary/diarySlice";

import { useAppDispatch, useAppSelector } from "../../hooks";

import { COLORS, SPACE, TYPO } from "../../styles/tokens";

export default function HomeScreen() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <Text style={styles.counter}>{entries.length} diary</Text>

      <FlatList
        data={entries}
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
    color: COLORS.text,
  },

  counter: {
    color: COLORS.muted,
    marginBottom: SPACE.m,
  },
});
