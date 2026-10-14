import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { COLORS, SPACE, RADIUS, TYPO } from "../styles/tokens";
export default function DiaryCard({
  title,
  date,
  preview,
  moodUri,
  onPress,
  variant = "list",
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: COLORS.ripple }}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Buka detail ${title}, tanggal ${date}`}
    >
      <View style={styles.card}>
        <Image
          source={typeof moodUri === "string" ? { uri: moodUri } : moodUri}
          style={styles.mood}
        />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
            {preview}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },

  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    backgroundColor: COLORS.imagePlaceholder,
  },

  content: { flex: 1 },
  title: { fontSize: TYPO.title, fontWeight: "700", color: COLORS.text },

  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginBottom: 6,
  },

  preview: { fontSize: TYPO.body, color: COLORS.text },

  pressable: {
    minHeight: 44,
  },

  pressed: {
    opacity: 0.85,
  },
});
