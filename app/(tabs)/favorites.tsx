import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import { useEntries } from "../../src/context/EntriesContext";

export default function FavoritesScreen() {
  const { entries, likedIds, toggleLike } = useEntries();

  const router = useRouter();

  const favorites = entries.filter((entry) => likedIds.has(entry.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            moodImage={item.moodImage}
            liked={likedIds.has(item.id)}
            onToggleLike={() => toggleLike(item.id)}
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
        ListEmptyComponent={<Text>Belum ada diary yang disukai.</Text>}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  list: {
    gap: 12,
  },
});
