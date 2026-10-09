import React from "react";
import DiaryCard from "../components/DiaryCard";
import reactNative from "../../assets/moods/react-native.png";
import kopiSore from "../../assets/moods/kopi-sore.jpeg";
import pagi from "../../assets/moods/pagi.jpg";
import avatar from "../../assets/moods/avatar.jpg";

import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const diaryEntries = [
  {
    id: 1,
    title: "Pagi yang Tenang",
    date: "2025-10-06",
    preview:
      "Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit.Udara terasa sejuk...",
    moodUri: pagi,
    mood: "calm",
  },
  {
    id: 2,
    title: "Produktif di Kampus",
    date: "2025-10-05",
    preview:
      "Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyakinsight baru...",
    moodUri: "https://picsum.photos/seed/focus/80",
    mood: "productive",
  },
  {
    id: 3,
    title: "Senja di Taman",
    date: "2025-10-04",
    preview:
      "Menikmati senja sambil membaca buku favorit. Warna langitsangat indah...",
    moodUri: "https://picsum.photos/seed/calm/80",
    mood: "happy",
  },
  {
    id: 4,
    title: "Belajar React Native",
    date: "2026-10-09",
    preview:
      "Hari ini belajar membuat tampilan aplikasi menggunakan React Native. Banyak hal baru...",
    moodUri: reactNative,
    mood: "excited",
  },
  {
    id: 5,
    title: "Ngopi Sore",
    date: "2026-10-08",
    preview:
      "Sore ini menikmati kopi sambil mengerjakan tugas. Suasana tenang dan bikin lebih fokus...",
    moodUri: kopiSore,
    mood: "relaxed",
  },
];

export default function DiaryListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerContainer}>
        <Image source={avatar} style={styles.avatar} />
        <Text style={styles.header}>Buku Harian</Text>
      </View>

      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodUri={entry.moodUri}
          mood={entry.mood}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 25,
    marginBlock: 12,

    borderWidth: 3,
    borderColor: "#1fa2ff",
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  date: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
  },
});
