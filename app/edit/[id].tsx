import { useLocalSearchParams, useRouter } from "expo-router";
import { useHeaderHeight } from "expo-router/react-navigation";
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

import DiaryForm from "../../src/components/DiaryForm";
import { editDiary } from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/app/hooks";
import { COLORS, LAYOUT, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

const MOODS = ["😍", "🎯", "😌", "🥰", "🌤️"];

export default function EditScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const headerHeight = useHeaderHeight();
  const { id } = useLocalSearchParams<{ id: string }>();

  const entry = useAppSelector((state) =>
    state.diary.entries.find((item) => item.id === Number(id)),
  );

  const [title, setTitle] = useState(entry?.title ?? "");
  const [body, setBody] = useState(entry?.body ?? "");
  const [mood, setMood] = useState(entry?.mood ?? "😍");

  if (!entry) {
    return <Text style={styles.notFound}>Diary tidak ditemukan.</Text>;
  }

  const showValidation = (message: string) => {
    if (Platform.OS === "web") {
      window.alert(message);
      return;
    }

    Alert.alert("Validasi", message);
  };

  const saveChanges = () => {
    if (title.trim().length < 3) {
      showValidation("Judul diary minimal 3 karakter.");
      return;
    }

    if (!body.trim()) {
      showValidation("Isi diary wajib diisi.");
      return;
    }

    dispatch(
      editDiary({
        id: entry.id,
        title: title.trim(),
        body: body.trim(),
        mood,
      }),
    );

    router.back();
  };

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "web" ? undefined : "padding"}
        keyboardVerticalOffset={headerHeight}
        style={styles.keyboardView}
      >
        <View pointerEvents="none" style={styles.purpleBackground} />
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Perbarui cerita</Text>

          <View style={styles.formPanel}>
            <DiaryForm
              title={title}
              body={body}
              mood={mood}
              moods={MOODS}
              onChangeTitle={setTitle}
              onChangeBody={setBody}
              onChangeMood={setMood}
              onSave={saveChanges}
              saveLabel="Simpan Perubahan"
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
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  purpleBackground: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 140,
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
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.white,
  },
  formPanel: {
    padding: SPACE.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },
  notFound: {
    padding: SPACE.xl,
    color: COLORS.muted,
    fontSize: TYPO.body,
  },
});
