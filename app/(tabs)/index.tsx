import { useEffect } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import {
  fetchDiaries,
} from "../../src/diarySlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../src/hooks";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch =
    useAppDispatch();

  const {
    entries,
    loading,
    error,
  } = useAppSelector(
    (state) =>
      state.diary
  );

  useEffect(() => {
    dispatch(fetchDiaries());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
        />
        <Text>
          Mengambil data...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Buku Harian
      </Text>

      <FlatList
        data={entries}
        keyExtractor={(item) =>
          String(item.id)
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname:
                  "/detail/[id]",
                params: {
                  id: String(
                    item.id
                  ),
                },
              })
            }
          >
            <Text style={styles.mood}>
              {item.mood}
            </Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text>
                {item.diary_date}
              </Text>

              <Text
                numberOfLines={2}
              >
                {item.body}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor:
        "#F8FAFC",
    },

    header: {
      fontSize: 26,
      fontWeight: "700",
      marginBottom: 12,
    },

    card: {
      flexDirection: "row",
      gap: 12,
      padding: 14,
      marginBottom: 12,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
    },

    mood: {
      fontSize: 30,
    },

    title: {
      fontSize: 17,
      fontWeight: "700",
    },

    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });