import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import DiaryForm from "../../src/components/DiaryForm";
import { useAppDispatch } from "../../src/app/hooks";
import { addDiary } from "../../src/features/diary/diarySlice";
import { COLORS, LAYOUT, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["😍", "🎯", "😌", "🥰"];

export default function CreateScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("😍");

  const showValidation = (message: string) => {
    if (Platform.OS === "web") {
      window.alert(message);
      return;
    }

    Alert.alert("Validasi", message);
  };

  const saveDiary = () => {
    if (title.trim().length < 3) {
      showValidation("Judul diary minimal 3 karakter.");
      return;
    }

    if (!body.trim()) {
      showValidation("Isi diary wajib diisi.");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    dispatch(
      addDiary({
        title: title.trim(),
        date: today,
        preview: body.trim().slice(0, 100),
        body: body.trim(),
        mood,
      }),
    );

    setTitle("");
    setBody("");
    setMood("😍");

    router.replace("/");
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "web" ? undefined : "padding"}
        style={styles.keyboardView}
      >
        <View pointerEvents="none" style={styles.purpleBackground} />
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Tambah Diary</Text>

          <View style={styles.formPanel}>
            <DiaryForm
              title={title}
              body={body}
              mood={mood}
              moods={MOODS}
              onChangeTitle={setTitle}
              onChangeBody={setBody}
              onChangeMood={setMood}
              onSave={saveDiary}
              saveLabel="Simpan Diary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.heroStart,
  },
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  purpleBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 160,
    backgroundColor: COLORS.heroStart,
  },
  content: {
    width: "100%",
    maxWidth: LAYOUT.form,
    alignSelf: "center",
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    paddingBottom: SPACE.xxl,
  },
  heading: {
    marginBottom: SPACE.l,
    color: COLORS.white,
    fontSize: TYPO.h1,
    fontWeight: "700",
  },
  formPanel: {
    padding: SPACE.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
});
