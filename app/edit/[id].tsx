import { useState } from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  editDiary,
} from "../../src/diarySlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../src/hooks";

export default function EditScreen() {
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

  const [title, setTitle] =
    useState(entry?.title || "");

  const [body, setBody] =
    useState(entry?.body || "");

  const [mood, setMood] =
    useState(entry?.mood || "😊");

  if (!entry) {
    return (
      <Text style={{ padding: 16 }}>
        Diary tidak ditemukan.
      </Text>
    );
  }

  const save = async () => {
    try {
      await dispatch(
        editDiary({
          id: entry.id,
          data: {
            title,
            diary_date:
              entry.diary_date,
            body,
            mood,
          },
        })
      ).unwrap();

      router.replace({
        pathname:
          "/detail/[id]",
        params: {
          id: String(entry.id),
        },
      });
    } catch {
      Alert.alert(
        "Error",
        "Gagal mengubah diary"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Edit Diary
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        value={body}
        onChangeText={setBody}
        multiline
        style={[
          styles.input,
          styles.body,
        ]}
      />

      <TextInput
        value={mood}
        onChangeText={setMood}
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={save}
      >
        <Text style={styles.white}>
          Simpan Perubahan
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

    header: {
      fontSize: 24,
      fontWeight: "700",
    },

    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      padding: 12,
    },

    body: {
      minHeight: 120,
      textAlignVertical: "top",
    },

    button: {
      backgroundColor: "#2563EB",
      padding: 14,
      borderRadius: 12,
      alignItems: "center",
    },

    white: {
      color: "#fff",
      fontWeight: "700",
    },
  });