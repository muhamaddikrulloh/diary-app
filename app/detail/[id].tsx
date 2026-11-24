import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  removeDiary,
} from "../../src/diarySlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../src/hooks";

export default function DetailScreen() {
  const router = useRouter();
  const dispatch =
    useAppDispatch();

  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const entry =
    useAppSelector(
      (state) =>
        state.diary.entries.find(
          (item) =>
            item.id === Number(id)
        )
    );

  if (!entry) {
    return (
      <Text style={{ padding: 16 }}>
        Diary tidak ditemukan.
      </Text>
    );
  }

  const remove = async () => {
    try {
      await dispatch(
        removeDiary(entry.id)
      ).unwrap();

      router.replace("/");
    } catch {
      Alert.alert(
        "Error",
        "Gagal menghapus diary"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mood}>
        {entry.mood}
      </Text>

      <Text style={styles.title}>
        {entry.title}
      </Text>

      <Text>
        {entry.diary_date}
      </Text>

      <Text style={styles.body}>
        {entry.body}
      </Text>

      <Pressable
        style={styles.edit}
        onPress={() =>
          router.push({
            pathname:
              "/edit/[id]",
            params: {
              id: String(entry.id),
            },
          })
        }
      >
        <Text style={styles.white}>
          Edit
        </Text>
      </Pressable>

      <Pressable
        style={styles.delete}
        onPress={remove}
      >
        <Text style={styles.white}>
          Hapus
        </Text>
      </Pressable>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      gap: 12,
    },

    mood: {
      fontSize: 50,
    },

    title: {
      fontSize: 26,
      fontWeight: "700",
    },

    body: {
      fontSize: 16,
      lineHeight: 24,
    },

    edit: {
      backgroundColor: "#2563EB",
      padding: 14,
      borderRadius: 12,
      alignItems: "center",
    },

    delete: {
      backgroundColor: "#EF4444",
      padding: 14,
      borderRadius: 12,
      alignItems: "center",
    },

    white: {
      color: "#fff",
      fontWeight: "700",
    },
  });