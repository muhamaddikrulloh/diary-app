import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS, RADIUS, SPACE, TYPO } from "../styles/tokens";

const MOOD_LABELS: Record<string, string> = {
  "😍": "Senang",
  "🎯": "Fokus",
  "😌": "Tenang",
  "🥰": "Sayang",
  "🌤️": "Cerah",
};

type Props = {
  title: string;
  body: string;
  mood: string;
  moods: readonly string[];
  onChangeTitle: (value: string) => void;
  onChangeBody: (value: string) => void;
  onChangeMood: (value: string) => void;
  onSave: () => void;
  saveLabel: string;
};

export default function DiaryForm({
  title,
  body,
  mood,
  moods,
  onChangeTitle,
  onChangeBody,
  onChangeMood,
  onSave,
  saveLabel,
}: Props) {
  return (
    <View style={styles.form}>
      <View style={styles.field}>
        <Text style={styles.label}>Judul diary</Text>
        <TextInput
          value={title}
          onChangeText={onChangeTitle}
          placeholder="Beri judul untuk ceritamu"
          placeholderTextColor={COLORS.placeholder}
          selectionColor={COLORS.accent}
          accessibilityLabel="Judul diary"
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Cerita hari ini</Text>
        <TextInput
          value={body}
          onChangeText={onChangeBody}
          placeholder="Ceritakan harimu..."
          placeholderTextColor={COLORS.placeholder}
          selectionColor={COLORS.accent}
          accessibilityLabel="Isi diary"
          multiline
          textAlignVertical="top"
          style={[styles.input, styles.bodyInput]}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Pilih mood</Text>
        <View style={styles.moodRow}>
          {moods.map((item) => {
            const selected = mood === item;

            return (
              <Pressable
                key={item}
                onPress={() => onChangeMood(item)}
                accessibilityRole="radio"
                accessibilityLabel={`Mood ${MOOD_LABELS[item]}`}
                accessibilityState={{ checked: selected }}
                style={[styles.moodButton, selected && styles.selectedMood]}
              >
                <Text style={styles.emoji}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Pressable
        onPress={onSave}
        accessibilityRole="button"
        style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
      >
        <Text style={styles.saveButtonText}>{saveLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: SPACE.l,
  },
  field: {
    gap: SPACE.s,
  },
  label: {
    color: COLORS.text,
    fontSize: TYPO.label,
    fontWeight: "600",
  },
  input: {
    minHeight: 48,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.surface,
    color: COLORS.text,
    fontSize: TYPO.body,
  },
  bodyInput: {
    minHeight: 156,
    paddingTop: SPACE.l,
    lineHeight: 22,
  },
  moodRow: {
    flexDirection: "row",
    gap: SPACE.xs,
  },
  moodButton: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: SPACE.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.surface,
  },
  selectedMood: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accentSoft,
  },
  emoji: {
    fontSize: 26,
  },
  saveButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.accent,
  },
  saveButtonPressed: {
    opacity: 0.88,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: TYPO.body,
    fontWeight: "700",
  },
});
