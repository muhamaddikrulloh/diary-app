import { useState } from "react";

import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import {
  addDiary,
} from "../../src/diarySlice";

import {
  useAppDispatch,
} from "../../src/hooks";

export default function CreateScreen() {
  const router = useRouter();
  const dispatch =
    useAppDispatch();

  const [title, setTitle] =
    useState("");

  const [body, setBody] =
    useState("");

  const [mood, setMood] =
    useState("😊");

  const save = async () => {
    if (!title || !body) {
      Alert.alert(
        "Validasi",
        "Judul dan isi wajib diisi"
      );
      return;
    }

    try {
      await dispatch(
        addDiary({
          title,
          diary_date:
            new Date()
              .toISOString()
              .slice(0, 10),
          body,
          mood,
        })
      ).unwrap();

      router.replace("/");
    } catch {
      Alert.alert(
        "Error",
        "Diary gagal disimpan"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Tambah Diary
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul"
        style={styles.input}
      />

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Isi diary"
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
          Simpan
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