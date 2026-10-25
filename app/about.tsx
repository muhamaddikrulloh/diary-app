import { Stack, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Tentang Aplikasi" }} />

      <View style={styles.container}>
        <Text style={styles.description}>
          Diary App adalah aplikasi catatan harian yang dibuat menggunakan React
          Native dan Expo Router.
        </Text>

        <Text style={styles.description}>
          Aplikasi ini memiliki fitur menambah catatan, melihat detail, mencari
          diary, dan menyimpan catatan favorit.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.replace("/(tabs)/settings")}
        >
          <Text style={styles.buttonText}>Kembali</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#475569",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
