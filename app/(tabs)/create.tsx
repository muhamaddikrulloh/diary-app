import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDiary } from "../../src/context/DiaryContext";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["🎯", "😞", "😴", "😊"];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("2026-11-02");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("😊");
  const canSave = title.trim().length > 0 && body.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addEntry({
      title: title.trim(),
      date: date.trim(),
      preview: body.trim().slice(0, 80),
      body: body.trim(),
      mood,
    });
    setTitle("");
    setBody("");
    setMood("😊");
    router.replace("/");
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.heading}>Tambah Diary</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Judul</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Judul"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tanggal</Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={COLORS.muted}
              style={styles.input}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Isi Diary</Text>
            <TextInput
              value={body}
              onChangeText={setBody}
              placeholder="Ceritakan harimu..."
              placeholderTextColor={COLORS.muted}
              multiline
              style={[styles.input, styles.bodyInput]}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Mood</Text>
            <View style={styles.moodRow}>
              {MOODS.map((item) => {
                const isSelected = mood === item;
                return (
                  <Pressable
                    key={item}
                    onPress={() => setMood(item)}
                    style={({ pressed }) => [
                      styles.moodButton,
                      isSelected && styles.moodSelected,
                      pressed && styles.pressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={`Pilih mood ${item}`}
                  >
                    <Text style={styles.mood}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            onPress={save}
            disabled={!canSave}
            style={({ pressed }) => [
              styles.saveButton,
              !canSave && styles.disabled,
              canSave && pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Simpan diary"
          >
            <Text style={styles.saveText}>Simpan</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    paddingBottom: SPACE.xl,
    gap: SPACE.m,
  },
  heading: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  formGroup: {
    gap: 6,
  },
  label: {
    fontSize: TYPO.body,
    fontWeight: "600",
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: TYPO.body,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  bodyInput: {
    minHeight: 120,
    textAlignVertical: "top",
    lineHeight: 20,
  },
  moodRow: {
    flexDirection: "row",
    gap: SPACE.s,
  },
  moodButton: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  moodSelected: {
    backgroundColor: COLORS.accentLight,
    borderColor: COLORS.accent,
    borderWidth: 1.5,
  },
  mood: {
    fontSize: 22,
  },
  saveButton: {
    marginTop: SPACE.s,
    minHeight: 48,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.7,
  },
  saveText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
});
