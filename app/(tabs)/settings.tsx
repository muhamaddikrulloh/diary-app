import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACE, TYPO } from "../../src/styles/tokens";

export default function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.settingLabel}>Compact Mode</Text>
            <Text style={styles.settingDescription}>
              Tampilan daftar catatan lebih ringkas
            </Text>
          </View>
          <Switch
            value={compactMode}
            onValueChange={setCompactMode}
            trackColor={{ false: COLORS.border, true: COLORS.accent }}
            thumbColor={COLORS.surface}
          />
        </View>
      </View>

      <Text style={styles.info}>
        State: {compactMode ? "Aktif" : "Nonaktif"}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACE.l,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelContainer: {
    flex: 1,
    marginRight: SPACE.m,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  settingDescription: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  info: {
    marginTop: SPACE.m,
    color: COLORS.muted,
    fontSize: TYPO.caption,
    paddingHorizontal: 4,
  },
});
