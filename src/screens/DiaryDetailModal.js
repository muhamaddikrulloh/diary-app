import React from "react";
import { Modal, View, Text, Image, StyleSheet, Pressable } from "react-native";
import { COLORS, SPACE, RADIUS, TYPO } from "../styles/tokens";
export default function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) return null;
  const { title, date, body, heroUri } = entry;
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      accessibilityViewIsModal
    >
      <View style={styles.container}>
        <Image
          source={
            typeof (heroUri || entry.moodUri) === "string"
              ? { uri: heroUri || entry.moodUri }
              : heroUri || entry.moodUri
          }
          style={styles.hero}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.body}>{body}</Text>
          <Pressable
            onPress={onClose}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Tutup detail diary"
          >
            <Text style={styles.buttonText}>Tutup</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  hero: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
    backgroundColor: COLORS.modalPlaceholder,
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },

  content: { padding: SPACE.l, gap: SPACE.s },

  title: {
    fontSize: TYPO.detailTitle,
    fontWeight: "700",
    color: COLORS.text,
  },

  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: SPACE.s },
  body: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 },

  button: {
    marginTop: SPACE.l,
    padding: SPACE.m,
    minHeight: 44,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
  },
});
