import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import DiaryCard from "../components/DiaryCard";
import DiaryDetailModal from "./DiaryDetailModal";
import { COLORS, SPACE, RADIUS, TYPO, BREAKPOINTS } from "../styles/tokens";
import belajarReactNative from "../../assets/moods/belajar-react-native.jpg";
import akhirPekan from "../../assets/moods/akhir-pekan.jpg";

const DATA = [
  {
    id: 1,
    title: "Pagi yang Tenang",
    mood: "tenang",
    date: "2025-10-06",
    preview: "Bangun lebih pagi…",
    body: "Catatan lengkap…",
    moodUri: "https://picsum.photos/seed/happy/200",
    heroUri: "https://picsum.photos/seed/happyhero/800/450",
  },
  {
    id: 2,
    title: "Produktif di Kampus",
    mood: "produktif",
    date: "2025-10-05",
    preview: "Menyelesaikan modul…",
    body: "Kemajuan proyek…",
    moodUri: "https://picsum.photos/seed/focus/200",
    heroUri: "https://picsum.photos/seed/focushero/800/450",
  },
  {
    id: 3,
    title: "Senja di Taman",
    mood: "tenang",
    date: "2025-10-04",
    preview: "Membaca buku…",
    body: "Refleksi singkat…",
    moodUri: "https://picsum.photos/seed/calm/200",
    heroUri: "https://picsum.photos/seed/calmhero/800/450",
  },
  {
    id: 4,
    title: "Belajar React Native",
    mood: "produktif",
    date: "2025-10-07",
    preview: "Mempelajari komponen dan styling.",
    body: "Hari ini saya mempelajari penggunaan StyleSheet, design tokens, dan komponen React Native. Saya mulai memahami bagaimana membuat tampilan aplikasi yang lebih konsisten.",
    moodUri: belajarReactNative,
    heroUri: belajarReactNative,
  },
  {
    id: 5,
    title: "Menikmati Akhir Pekan",
    mood: "santai",
    date: "2025-10-08",
    preview: "Menghabiskan waktu untuk beristirahat.",
    body: "Setelah beberapa hari mengerjakan tugas kuliah, saya memanfaatkan akhir pekan untuk beristirahat dan mengisi kembali energi.",
    moodUri: akhirPekan,
    heroUri: akhirPekan,
  },
];

function DiarySkeleton() {
  return (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonAvatar} />

      <View style={styles.skeletonContent}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonDate} />
        <View style={styles.skeletonPreview} />
      </View>
    </View>
  );
}

export default function DiaryListScreen() {
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const [selected, setSelected] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrapGrid]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        mood={item.mood}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  const keyForCols = useMemo(() => (twoCols ? "grid2" : "list1"), [twoCols]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      {loading ? (
        <View style={styles.skeletonList}>
          {[1, 2, 3].map((item) => (
            <DiarySkeleton key={item} />
          ))}
        </View>
      ) : (
        <FlatList
          key={keyForCols}
          data={DATA}
          numColumns={twoCols ? 2 : 1}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
          contentContainerStyle={{
            padding: SPACE.l,
            gap: SPACE.m,
            paddingTop: SPACE.m,
          }}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Belum Ada Catatan</Text>
              <Text style={styles.emptyDescription}>
                Belum ada cerita yang ditulis. Mulai abadikan momen dan
                pengalaman harianmu di sini.
              </Text>
            </View>
          }
        />
      )}
      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },

  itemWrap: {
    flex: 1,
  },

  itemWrapGrid: {
    flex: 0.5,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SPACE.xl,
    marginTop: SPACE.xxl,
  },

  emptyTitle: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.s,
    textAlign: "center",
  },

  emptyDescription: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 300,
  },

  skeletonCard: {
    flexDirection: "row",
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
  },

  skeletonAvatar: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.avatar,
    backgroundColor: COLORS.border,
  },

  skeletonContent: {
    flex: 1,
    gap: SPACE.s,
    justifyContent: "center",
  },

  skeletonTitle: {
    width: "65%",
    height: 14,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },

  skeletonDate: {
    width: "35%",
    height: 10,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },

  skeletonPreview: {
    width: "85%",
    height: 12,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },

  skeletonList: {
    padding: SPACE.l,
    gap: SPACE.m,
  },
});
